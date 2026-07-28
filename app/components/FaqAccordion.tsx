'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

/**
 * FaqAccordion — single-open disclosure list on the dusk panel.
 *
 * Single-open per the handoff: clicking a closed row opens it and closes the
 * other; clicking the open row closes it. Row 0 starts open.
 *
 * The panel animates max-height rather than height because height:auto is not
 * animatable. 320px is the documented ceiling — an answer taller than that
 * would clip, so keep answers short or raise it here deliberately.
 */
export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="panel rounded-2xl px-5 sm:px-8">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={item.question}
            className={i > 0 ? 'border-t border-dashed border-white/[0.12]' : undefined}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium text-white"
              >
                {item.question}
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 text-zinc-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              className="overflow-hidden transition-[max-height] duration-300 ease-out"
              style={{ maxHeight: isOpen ? 320 : 0 }}
            >
              <p className="pb-5 text-[15px] leading-relaxed text-zinc-400">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
