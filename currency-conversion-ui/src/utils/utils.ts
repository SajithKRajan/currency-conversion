import { ExchangeType } from "../interface/IExchange";
import { FilterPayload } from "../interface/IExchangeFilter";

export const splitCurrencyFullName = (fullName: string) => {
  const lastSpaceIndex = fullName.lastIndexOf(" ");
  const name = fullName.substring(0, lastSpaceIndex);
  const symbol = fullName
    .substring(lastSpaceIndex, fullName.length)
    .replace("(", "")
    .replace(")", "");
  return { name: name || symbol, symbol };
};

export const getSeverity = (exchangeType?: ExchangeType) => {
  switch (exchangeType) {
    case ExchangeType.LIVE:
      return "success";
    case ExchangeType.EXCHANGE:
      return "info";
    default:
      return null;
  }
};

export const getDeafaultFilter = (): FilterPayload => {
  const date_from = new Date();
  date_from.setHours(0);
  date_from.setMinutes(0);
  date_from.setSeconds(0);
  const date_to = new Date();
  date_to.setDate(date_to.getDate());
  date_to.setHours(24);
  date_to.setMinutes(0);
  date_to.setSeconds(0);
  return {
    date_from,
    date_to,
  };
};
