import { convert } from "../apis/CurrencyApis";
import { IConvertPayload } from "../interface/IConvertPayload";
import { ICurrencyModel } from "../interface/ICurrency";

/**
 * The service for filtering the auto suggestion list based on the input text.
 * @param text - input text
 * @param source - the source list.
 * @returns - The filered currency list.
 */
export function autoSuggestionSearch(text: string, source: ICurrencyModel[]) {
  let _filteredCountries: ICurrencyModel[] = [];

  if (!text.trim().length) {
    _filteredCountries = [...source];
  } else {
    _filteredCountries = source.filter((country: ICurrencyModel) => {
      return (
        country.name_full.toLowerCase().startsWith(text.toLowerCase()) ||
        country.symbol.toLowerCase().startsWith(text.toLowerCase())
      );
    });
  }
  return _filteredCountries;
}

/**
 * The service for fetch converted rate based on the input
 * @param data - The input date for convertion.
 * @returns - The converted rate
 */
export function convertCurrency(data: any): Promise<number> {
  if (data.amount_from !== 0 && data.currency_from && data.currency_to) {
    const payload: IConvertPayload = {
      from: data.currency_from?.symbol,
      to: data.currency_to?.symbol,
      amount: data.amount_from,
    };
    return convert(payload);
  }
  return new Promise((res, rej) => rej(0));
}
