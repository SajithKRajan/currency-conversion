import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import "./HistoryView.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ExchangeType, IExchange } from "../../../interface/IExchange";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import SocketService from "../../../services/SocketService";
import { getSeverity } from "../../../utils/utils";
import { Tag } from "primereact/tag";
import { fetchExchangeList } from "../../../store/history.store";
import { Filters } from "../../common/filters/Filters";

const socket = new SocketService();

export const HistoryView = () => {
  const state = useAppSelector((state) => state.exchange);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExchangeList(null));
    socket.initializeConnect();
    socket.startSubscription(state.filters);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.stopSubscription();
    socket.startSubscription(state.filters);
  }, [state.filters]);

  const statusBodyTemplate = (exchange: IExchange) => {
    return (
      <Tag
        value={exchange.type === ExchangeType.EXCHANGE ? "Exchange" : "Live"}
        severity={getSeverity(exchange.type)}
      ></Tag>
    );
  };

  return (
    <Panel className="history main-panel">
      <Card className="form-container" title="History">
        <Filters />
        <DataTable
          value={state.history}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          loading={state.isLoading}
        >
          <Column
            field="date_time"
            header="Date & Time"
            sortable
            style={{ width: "16%" }}
          ></Column>
          <Column
            field="currency_from"
            header="Currency From"
            sortable
            style={{ width: "16%" }}
          ></Column>
          <Column
            field="amount_from"
            header="Amount1"
            sortable
            style={{ width: "16%" }}
          ></Column>
          <Column
            field="currency_to"
            header="Currency To"
            sortable
            style={{ width: "16%" }}
          ></Column>
          <Column
            field="amount_to"
            header="Amount2"
            sortable
            style={{ width: "16%" }}
          ></Column>
          <Column
            field="type"
            header="Type"
            sortable
            style={{ width: "16%" }}
            body={statusBodyTemplate}
          ></Column>
        </DataTable>
      </Card>
    </Panel>
  );
};
