import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { getExchangeData } from "../apis/ExchangeApis";
import { IExchange } from "../interface/IExchange";
import { FilterPayload } from "../interface/IExchangeFilter";
import { getDeafaultFilter } from "../utils/utils";

// Define a type for the slice state
interface IHistoryState {
  history: IExchange[];
  isLoading: boolean;
  filters: FilterPayload;
}

// Define the initial state using that type
const initialState: IHistoryState = {
  history: [],
  filters: getDeafaultFilter(),
  isLoading: false,
};

/**
 * The thunk for fetch exchange list from backend.
 */
export const fetchExchangeList = createAsyncThunk(
  "history/fetchAll",
  async (payload: FilterPayload | null, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await getExchangeData(payload || state.exchange.filters);
    return response;
  }
);

export const HistoryStore = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExchangeList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchExchangeList.fulfilled, (state, action) => {
      state.history = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchExchangeList.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setHistory, setFilters } = HistoryStore.actions;

export default HistoryStore.reducer;
