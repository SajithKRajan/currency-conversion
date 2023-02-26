import { useState, useEffect } from "react";
// import { ProductService } from './service/ProductService';
import { DataView } from "primereact/dataview";
import { Tag } from "primereact/tag";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import SocketService from "../../../services/SocketService";
import { IExchange } from "../../../interface/IExchange";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import "./HistoryMobView.scss";
import { getSeverity, splitCurrencyFullName } from "../../../utils/utils";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { fetchExchangeList } from "../../../store/history.store";
import { Filters } from "../../common/filters/Filters";

const socket = new SocketService();

interface SortOption {
  label: string;
  value: string;
}

export default function HistoryMobView() {
  const state = useAppSelector((state) => state.exchange);
  const dispatch = useAppDispatch();
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<any>(0);
  const [sortField, setSortField] = useState<string>("");
  const sortOptions: SortOption[] = [
    { label: "DateTime DESC (\u2193)", value: "!date_time" },
    { label: "DateTime ASC (\u2191)", value: "date_time" },
  ];

  /**
   * On sort oder change
   * @param event - the change event.
   */
  const onSortChange = (event: DropdownChangeEvent) => {
    const value = event.value;
    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  useEffect(() => {
    dispatch(fetchExchangeList(null));
    socket.initializeConnect();
    socket.startSubscription(state.filters);
    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.stopSubscription();
    socket.startSubscription(state.filters);
  }, [state.filters]);

  const header = () => {
    return (
      <Dropdown
        options={sortOptions}
        value={sortKey}
        optionLabel="label"
        placeholder="Sort By Date Time"
        onChange={onSortChange}
        className="w-full sm:w-14rem"
      />
    );
  };

  const itemTemplate = (exchange: IExchange) => {
    const fromCurrency = splitCurrencyFullName(exchange.currency_from);
    return (
      <div className="list-card-item col-12 m-2">
        <div className="flex  flex-row align-items-start  gap-4">
          <div className="flex flex-row p-3  justify-content-between align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-start  gap-3">
              <div className="text-md font-bold">{`${fromCurrency.name} -> ${exchange.currency_to}`}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <span className="font-normal">{`Amount ${fromCurrency.symbol} ${exchange.amount_from}`}</span>
                </span>
              </div>
            </div>
            <div className="flex  align-items-center  gap-3 ">
              <Tag severity={getSeverity(exchange.type)}></Tag>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Panel className="history-mob main-panel">
      <Card className="form-container" title="History">
        <Filters />
        <div className="card">
          <DataView
            value={state.history}
            itemTemplate={itemTemplate}
            header={header()}
            paginator
            rows={5}
            sortField={sortField}
            sortOrder={sortOrder}
            paginatorTemplate={
              "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            }
          />
        </div>
      </Card>
    </Panel>
  );
}
