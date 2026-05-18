import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// Minimal markdown renderer for the STR-164 YMYL TRT copy docs. Handles the
// exact block + inline subset the CMO copy ships: H2/H3, paragraphs, ordered
// and unordered lists, blockquotes, horizontal rules, bold, italic, links
// (internal → next/link, external → anchor), and inline `[N]` citation refs
// that link to the page's `<CitationBlock />` `#cite-N` anchors.
//
// We avoid a markdown lib to keep the bundle and dependency surface tight —
// these 8 pages are static content with a known author convention.

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" }
  | { type: "blockquote"; text: string };

function splitBlocks(source: string): Block[] {
  const lines = source.split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i++;
      continue;
    }
    if (/^---\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      blocks.push({ type: "h2", text: h2[1].trim() });
      i++;
      continue;
    }
    const h3 = line.match(/^### (.+)$/);
    if (h3) {
      blocks.push({ type: "h3", text: h3[1].trim() });
      i++;
      continue;
    }
    const h4 = line.match(/^#### (.+)$/);
    if (h4) {
      blocks.push({ type: "h4", text: h4[1].trim() });
      i++;
      continue;
    }
    if (/^[*-] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[*-] /.test(lines[i])) {
        let item = lines[i].replace(/^[*-] /, "");
        i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i])) {
          item += " " + lines[i].trim();
          i++;
        }
        items.push(item);
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        let item = lines[i].replace(/^\d+\. /, "");
        i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i])) {
          item += " " + lines[i].trim();
          i++;
        }
        items.push(item);
      }
      blocks.push({ type: "ol", items });
      continue;
    }
    if (/^> /.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^> /.test(lines[i])) {
        buf.push(lines[i].replace(/^> /, ""));
        i++;
      }
      blocks.push({ type: "blockquote", text: buf.join(" ") });
      continue;
    }
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{2,4} |[*-] |\d+\. |> |---\s*$)/.test(lines[i])
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }
    if (paragraphLines.length > 0) {
      blocks.push({ type: "p", text: paragraphLines.join(" ").trim() });
    }
  }
  return blocks;
}

type Token =
  | { type: "text"; text: string }
  | { type: "bold"; tokens: Token[] }
  | { type: "italic"; tokens: Token[] }
  | { type: "link"; href: string; tokens: Token[] }
  | { type: "cite"; n: number };

function tokenizeInline(input: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  let buf = "";
  const flush = () => {
    if (buf.length > 0) {
      out.push({ type: "text", text: buf });
      buf = "";
    }
  };
  while (i < input.length) {
    const ch = input[i];

    if (ch === "[") {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)/.exec(input.slice(i));
      if (linkMatch) {
        flush();
        const [whole, label, href] = linkMatch;
        out.push({ type: "link", href, tokens: tokenizeInline(label) });
        i += whole.length;
        continue;
      }
      const citeMatch = /^\[(\d+)\]/.exec(input.slice(i));
      if (citeMatch) {
        flush();
        out.push({ type: "cite", n: Number(citeMatch[1]) });
        i += citeMatch[0].length;
        continue;
      }
    }

    if (ch === "*" && input[i + 1] === "*") {
      const end = input.indexOf("**", i + 2);
      if (end !== -1) {
        flush();
        out.push({ type: "bold", tokens: tokenizeInline(input.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }

    if (ch === "*") {
      const next = input.indexOf("*", i + 1);
      if (next !== -1) {
        const inner = input.slice(i + 1, next);
        if (inner.length > 0 && !inner.includes("\n")) {
          flush();
          out.push({ type: "italic", tokens: tokenizeInline(inner) });
          i = next + 1;
          continue;
        }
      }
    }

    buf += ch;
    i++;
  }
  flush();
  return out;
}

function renderTokens(tokens: Token[], keyPrefix = ""): ReactNode {
  return tokens.map((t, idx) => {
    const key = `${keyPrefix}-${idx}`;
    switch (t.type) {
      case "text":
        return <Fragment key={key}>{t.text}</Fragment>;
      case "bold":
        return <strong key={key}>{renderTokens(t.tokens, key)}</strong>;
      case "italic":
        return <em key={key}>{renderTokens(t.tokens, key)}</em>;
      case "cite":
        return (
          <sup key={key} className="ml-0.5 text-xs">
            <a
              href={`#cite-${t.n}`}
              className="text-zinc-500 underline-offset-2 hover:text-zinc-700 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
              aria-label={`Citation ${t.n}`}
            >
              [{t.n}]
            </a>
          </sup>
        );
      case "link": {
        const isInternal = t.href.startsWith("/") && !t.href.startsWith("//");
        const isHash = t.href.startsWith("#");
        if (isInternal) {
          return (
            <Link
              key={key}
              href={t.href}
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              {renderTokens(t.tokens, key)}
            </Link>
          );
        }
        if (isHash) {
          return (
            <a key={key} href={t.href} className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100">
              {renderTokens(t.tokens, key)}
            </a>
          );
        }
        return (
          <a
            key={key}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
          >
            {renderTokens(t.tokens, key)}
          </a>
        );
      }
    }
  });
}

function renderInline(text: string, keyPrefix = ""): ReactNode {
  return renderTokens(tokenizeInline(text), keyPrefix);
}

export function Markdown({ source }: { source: string }) {
  const blocks = splitBlocks(source);
  return (
    <div className="ymyl-prose flex flex-col gap-5 text-base leading-7 text-zinc-700 dark:text-zinc-300">
      {blocks.map((block, idx) => {
        const key = `b-${idx}`;
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={key}
                className="mt-6 scroll-mt-24 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
              >
                {renderInline(block.text, key)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={key}
                className="mt-4 scroll-mt-24 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
              >
                {renderInline(block.text, key)}
              </h3>
            );
          case "h4":
            return (
              <h4 key={key} className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {renderInline(block.text, key)}
              </h4>
            );
          case "p":
            return (
              <p key={key} className="text-zinc-700 dark:text-zinc-300">
                {renderInline(block.text, key)}
              </p>
            );
          case "ul":
            return (
              <ul key={key} className="ml-6 list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="ml-6 list-decimal space-y-2 text-zinc-700 dark:text-zinc-300">
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
                ))}
              </ol>
            );
          case "blockquote":
            return (
              <blockquote
                key={key}
                className="border-l-4 border-zinc-300 pl-4 italic text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
              >
                {renderInline(block.text, key)}
              </blockquote>
            );
          case "hr":
            return <hr key={key} className="my-2 border-zinc-200 dark:border-zinc-800" />;
        }
      })}
    </div>
  );
}
