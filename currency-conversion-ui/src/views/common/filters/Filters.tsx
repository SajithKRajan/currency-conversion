import { Button } from "primereact/button";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { ExchangeType } from "../../../interface/IExchange";
import { FilterPayload } from "../../../interface/IExchangeFilter";
import { fetchExchangeList, setFilters } from "../../../store/history.store";
import { useAppDispatch } from "../../../store/hooks";
import { getDeafaultFilter } from "../../../utils/utils";

interface ExchangeOption {
  name: string;
  type?: ExchangeType;
}

export const Filters = () => {
  const dispatch = useAppDispatch();
  const defaultFilter = getDeafaultFilter();
  const [dates, setDates] = useState<Date[] | null>([
    defaultFilter.date_from,
    defaultFilter.date_to,
  ]);
  const [selectedExchangeType, setSelectedExchangeType] =
    useState<ExchangeOption>({ name: "All", type: ExchangeType.ALL });
  const exchangeOptions: ExchangeOption[] = [
    { name: "All", type: ExchangeType.ALL },
    { name: "Exchange", type: ExchangeType.EXCHANGE },
    { name: "Live", type: ExchangeType.LIVE },
  ];

  const onDateFilterChange = (e: CalendarChangeEvent) => {
    setDates(e.value as Date[] | null);
    console.log(e.value);
  };

  const onTypeFilterchange = (e: DropdownChangeEvent) => {
    setSelectedExchangeType(e.value);
  };

  const onFilter = () => {
    if (dates && dates.length === 2 && dates[0] && dates[1]) {
      const filters: FilterPayload = {
        date_from: dates[0],
        date_to: dates[1],
        type:
          selectedExchangeType?.type === ExchangeType.ALL
            ? undefined
            : selectedExchangeType.type,
      };
      dispatch(setFilters(filters));
      dispatch(fetchExchangeList(filters));
    }
  };

  return (
    <>
      {isMobile ? (
        <div className="flex flex-column gap-0 md:gap-4">
          <div className="mb-2 p-2 flex-auto ">
            <label htmlFor="range-picker" className="font-normal block mb-2">
              Date (From-To)
            </label>
            <Calendar
              id="range-picker"
              value={dates}
              onChange={(e) => onDateFilterChange(e)}
              selectionMode="range"
              className="w-full"
              readOnlyInput
              showIcon
              touchUI
            />
          </div>
          <div className="mb-2 flex align-items-center gap-2">
            <div className="col-6 ">
              <label htmlFor="type-selector" className="font-normal block mb-2">
                Type
              </label>
              <Dropdown
                id="type-selector"
                value={selectedExchangeType}
                onChange={onTypeFilterchange}
                options={exchangeOptions}
                optionLabel="name"
                className=" w-full"
              />
            </div>
            <div className="col-6">
              <div className="flex-auto w-full mt-4">
                <Button
                  type="button"
                  className="justify-content-center w-full"
                  outlined
                  onClick={onFilter}
                >
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 md:mb-4 flex-row col-10 lg:col-6">
          <div className="flex-auto">
            <label htmlFor="range-picker" className="font-normal block mb-2">
              Date (From-To)
            </label>
            <Calendar
              id="range-picker"
              value={dates}
              onChange={(e) => onDateFilterChange(e)}
              selectionMode="range"
              className="w-full"
              readOnlyInput
              showIcon
            />
          </div>
          <div className="flex-auto">
            <label htmlFor="type-selector" className="font-normal block mb-2">
              Type
            </label>
            <Dropdown
              id="type-selector"
              value={selectedExchangeType}
              onChange={onTypeFilterchange}
              options={exchangeOptions}
              optionLabel="name"
              className="w-full"
            />
          </div>
          <div className="flex-auto" style={{ marginTop: "1.8rem" }}>
            <Button
              type="button"
              className="justify-content-center w-full"
              outlined
              onClick={onFilter}
            >
              Filter
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
