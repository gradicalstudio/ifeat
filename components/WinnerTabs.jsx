import LastYearWinners from "@/slices/LastYearWinners";
import TabSwitcher from "./TabSwitcher";

export default function WinnerTabs({ slice, context }) {
  const panels = slice.tabs.map((tab) => ({
    id: tab.id,
    label: tab.primary.tab_label || "Winners",
    content: <LastYearWinners slice={tab} context={context} />,
  }));

  return (
    <div>
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
