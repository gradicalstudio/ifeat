"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

// The active panel receives the tab bar through context, so the panel's content
// (which can be a server component) decides where to place it.
const TabBarContext = createContext(null);

// Puts the tab bar on the same row as a heading. On mobile it sits above the
// heading instead, since the heading takes the full width.
// Outside a TabSwitcher (or in a hidden panel) it just renders the heading.
export function HeadingWithTabBar({ children }) {
  const tabBar = useContext(TabBarContext);
  if (!tabBar) return children;
  return (
    <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
      {children}
      <div className="shrink-0">{tabBar}</div>
    </div>
  );
}

// The tab bar on its own right-aligned row, for layouts with no plain heading row.
export function TabBarRow({ className = "" }) {
  const tabBar = useContext(TabBarContext);
  if (!tabBar) return null;
  return <div className={`flex justify-end ${className}`}>{tabBar}</div>;
}

export default function TabSwitcher({ panels }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef([]);
  const focusAfterSwitch = useRef(false);

  // The tab bar lives inside the active panel, so switching tabs remounts it.
  // Move keyboard focus once the new panel (and its tab bar) has rendered.
  useEffect(() => {
    if (!focusAfterSwitch.current) return;
    focusAfterSwitch.current = false;
    tabRefs.current[active]?.focus();
  }, [active]);

  // A single year needs no tab bar.
  if (panels.length === 1) return panels[0].content;

  const select = (index) => {
    focusAfterSwitch.current = true;
    setActive(index);
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

  const tabBar = (
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
          onClick={() => select(i)}
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
  );

  return (
    <div>
      {panels.map((panel, i) => (
        <div
          key={panel.id}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={i !== active}
        >
          {/* Only the visible panel gets the tab bar */}
          <TabBarContext.Provider value={i === active ? tabBar : null}>
            {panel.content}
          </TabBarContext.Provider>
        </div>
      ))}
    </div>
  );
}
