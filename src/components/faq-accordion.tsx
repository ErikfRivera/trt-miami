import type { FaqEntry } from "@/lib/faq-content";

type FaqAccordionProps = {
  items: readonly FaqEntry[];
  /**
   * Heading element used for each question. Pages set this so the question
   * rank matches the section's H2 (most pages: H3).
   */
  headingTag?: "h3" | "h4";
  /** Default-open the first item. Closed by default keeps scroll length down. */
  defaultOpenFirst?: boolean;
};

export function FaqAccordion({
  items,
  headingTag = "h3",
  defaultOpenFirst = false,
}: FaqAccordionProps) {
  const Heading = headingTag;
  return (
    <ul className="flex flex-col divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {items.map((item, index) => (
        <li key={item.id} className="py-2">
          <details
            id={`faq-${item.id}`}
            className="group"
            open={defaultOpenFirst && index === 0}
          >
            <summary className="flex cursor-pointer items-start justify-between gap-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-50 [&::-webkit-details-marker]:hidden">
              <Heading className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                {item.question}
              </Heading>
              <span
                aria-hidden="true"
                className="mt-1 text-zinc-500 transition-transform duration-150 group-open:rotate-180 dark:text-zinc-400"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="pb-4 pr-8 text-zinc-600 dark:text-zinc-400">
              <p>{item.answer}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
