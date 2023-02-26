import { ExchangeView } from "../common/exchange/ExchangeView";
import { HistoryView } from "./history/HistoryView";

export const DesktopHomePage = () => {
  return (
    <div className="flex flex-column gap-3">
      <ExchangeView />
      <HistoryView />
    </div>
  );
};
