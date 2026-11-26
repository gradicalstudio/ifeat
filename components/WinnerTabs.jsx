import LastYearWinners from "@/slices/LastYearWinners";
import TabSwitcher from "./TabSwitcher";

export default function WinnerTabs({ slice, context }) {
  const panels = slice.tabs.map((tab) => ({
    id: tab.id,
    label: tab.primary.tab_label || "Winners",
    content: <LastYearWinners slice={tab} context={context} />,
  }));

  // Existing links point at #winners-2025, so keep that id on the wrapper
  // unless one of the tabs is itself labelled 2025 (ids must be unique)
  const hasYearTab = panels.some((panel) => panel.label === "2025");

  return (
    <div id={hasYearTab ? undefined : "winners-2025"}>
      {/* One scroll target per tab (#winners-2026, #winners-2025, ...); TabSwitcher
          opens the matching tab when a link to one of them is clicked */}
      {panels.map((panel) => (
        <span
          key={panel.id}
          id={`winners-${panel.label}`}
          className="block scroll-mt-25"
        />
      ))}
      <TabSwitcher panels={panels} />
    </div>
  );
}
