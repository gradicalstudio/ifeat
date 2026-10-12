"use client";

import { useId, useRef, useState } from "react";

export default function TabSwitcher({ panels }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef([]);

  // A single year needs no tab bar.
  if (panels.length === 1) return panels[0].content;

  const select = (index) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (e) => {
    const last = panels.length - 1;
    if (e.key === "ArrowRight") select(active === last ? 0 : active + 1);
    else if (e.key === "ArrowLeft") select(active === 0 ? last : active - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(last);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div className="xl:max-w-385 px-4 md:px-5 xl:mx-auto xl:px-21 mb-8 xl:mb-10 flex justify-end">
        <div
          role="tablist"
          className="inline-flex gap-1 rounded-full border border-[#677479]/40 p-1"
          onKeyDown={onKeyDown}
        >
          {panels.map((panel, i) => (
            <button
              key={panel.id}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`cursor-pointer rounded-full px-5 py-2 font-raleway text-sm md:text-base font-medium transition-colors ${
                i === active
                  ? "bg-[#A59653] text-[#FEFFF4]"
                  : "text-[#263B33] hover:bg-[#A59653]/15"
              }`}
            >
              {panel.label}
            </button>
          ))}
        </div>
      </div>
      {panels.map((panel, i) => (
        <div
          key={panel.id}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={i !== active}
        >
          {panel.content}
        </div>
      ))}
    </div>
  );
}
