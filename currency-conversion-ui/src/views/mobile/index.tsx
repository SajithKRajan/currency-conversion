import { ExchangeView } from "../common/exchange/ExchangeView";
import HistoryMobView from "./history/HistoryMobView";

export const MobileHomePage = () => {
  return (
    <div className="flex flex-column gap-3">
      <ExchangeView />
      <HistoryMobView />
    </div>
  );
};
