import type { FaqEntry } from "@/lib/faq-content";

type DarkFaqAccordionProps = {
  items: readonly FaqEntry[];
  headingTag?: "h3" | "h4";
};

export function DarkFaqAccordion({
  items,
  headingTag = "h3",
}: DarkFaqAccordionProps) {
  const Heading = headingTag;
  return (
    <ul className="flex flex-col divide-y divide-slate-800 border-y border-slate-800">
      {items.map((item) => (
        <li key={item.id} className="py-1">
          <details id={`faq-${item.id}`} className="group">
            <summary className="flex cursor-pointer items-start justify-between gap-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 [&::-webkit-details-marker]:hidden">
              <Heading className="text-base font-medium text-slate-100 sm:text-lg">
                {item.question}
              </Heading>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-amber-400 transition-transform duration-150 group-open:rotate-180"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
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
            <div className="pb-5 pr-8 text-slate-400">
              <p className="leading-7">{item.answer}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
