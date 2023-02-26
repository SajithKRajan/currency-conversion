import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllCurrencies } from "../apis/CurrencyApis";
import { ICurrencList } from "../interface/ICurrencyList";

/**
 * The exchange state model
 */
export interface IExchangeStateModel {
  currencyList: ICurrencList;
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: IExchangeStateModel = {
  currencyList: {
    crypto: [],
    fiat: [],
  },
  isLoading: false,
};

/**
 * The thunk for fetch currency list from backend.
 */
export const fetchAll = createAsyncThunk("currency/fetchAll", async () => {
  const response = await fetchAllCurrencies();
  return response;
});

export const ExchangeStore = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      state.currencyList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAll.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setLoading } = ExchangeStore.actions;

export default ExchangeStore.reducer;
