import LastYearWinners from "@/slices/LastYearWinners";
import TabSwitcher from "./TabSwitcher";

export default function WinnerTabs({ slice, context }) {
  const panels = slice.tabs.map((tab) => ({
    id: tab.id,
    label: tab.primary.tab_label || "Winners",
    content: <LastYearWinners slice={tab} context={context} />,
  }));

  return (
    <div id="winners-2025">
      <TabSwitcher panels={panels} />
    </div>
  );
}
