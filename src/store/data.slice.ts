import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IClientDefinitionInfo } from '../pages/client-definition/ClientDefinition.models';
import { IPortfolio } from '../models/portfolio.model';
import { getClientDefinition, saveClientDefinition } from '../services/client-definition.service';
import { RootState } from '../store';
import { getPortfolio, getPortfolios, savePortfolio } from '../services/portfolio.service';
import { IPortfolioDetails } from '../pages/portfolioDetails/portfolioDetails.models';

interface IDataState {
  clientDefinition: IClientDefinitionInfo | null;
  portfolios: IPortfolio[] | null;
  selectedPortfolio: IPortfolioDetails | null;
  pending: boolean[];
}

const initialState: IDataState = {
  clientDefinition: null,
  portfolios: null,
  selectedPortfolio: null,
  pending: []
}

export const loadClientDefinitionInfo = createAsyncThunk(
  'data/loadClientDefinitionInfo',
  async (_, { rejectWithValue }) => {

    return getClientDefinition().catch(error => rejectWithValue(error));
  }
);

export const saveClientDefinitionInfo = createAsyncThunk(
  'data/saveClientDefinitionInfo',
  async (clientDefinition: IClientDefinitionInfo, { rejectWithValue }) => {

    return saveClientDefinition(clientDefinition).catch(error => rejectWithValue(error));
  }
);

const clientDefinitionExtraReducers = (builder: ActionReducerMapBuilder<IDataState>) => {
  builder
  .addCase(loadClientDefinitionInfo.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(loadClientDefinitionInfo.fulfilled, (state, action) => {
    state.clientDefinition = action.payload as IClientDefinitionInfo;
    state.pending.pop();
  })
  .addCase(loadClientDefinitionInfo.rejected, (state) => {
    state.pending.pop();
  })
  .addCase(saveClientDefinitionInfo.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(saveClientDefinitionInfo.fulfilled, (state, action) => {
    state.clientDefinition = action.payload as IClientDefinitionInfo;
    state.pending.pop();
  })
  .addCase(saveClientDefinitionInfo.rejected, (state) => {
    state.pending.pop();
  })
};

export const loadPortfolios = createAsyncThunk(
  'data/loadPortfolios',
  async (_, { rejectWithValue }) => {

    return getPortfolios().catch(error => rejectWithValue(error));
  }
);

export const loadPortfolio = createAsyncThunk(
  'data/loadPortfolio',
  async (id: string, { rejectWithValue }) => {

    return getPortfolio(id).catch(error => rejectWithValue(error));
  }
);

export const upsertPortfolio = createAsyncThunk(
  'data/upsertPortfolio',
  async (portfolio: IPortfolioDetails, { rejectWithValue }) => {

    return savePortfolio(portfolio).catch(error => rejectWithValue(error));
  }
);

const portfolioExtraReducers = (builder: ActionReducerMapBuilder<IDataState>) => {
  builder
  .addCase(loadPortfolios.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(loadPortfolios.fulfilled, (state, action) => {
    state.portfolios = action.payload;
    state.pending.pop();
  })
  .addCase(loadPortfolios.rejected, (state) => {
    state.pending.pop();
  })
  .addCase(loadPortfolio.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(loadPortfolio.fulfilled, (state, action) => {
    state.selectedPortfolio = action.payload;
    state.pending.pop();
  })
  .addCase(loadPortfolio.rejected, (state) => {
    state.pending.pop();
  })
  .addCase(upsertPortfolio.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(upsertPortfolio.fulfilled, (state, action) => {
    state.selectedPortfolio = action.payload;
    state.pending.pop();
  })
  .addCase(upsertPortfolio.rejected, (state) => {
    state.pending.pop();
  })
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    clientDefinitionExtraReducers(builder);
    portfolioExtraReducers(builder);
  }
});

export const selectClientDefinition = (state: RootState) => state.data.clientDefinition;
export const selectProfile = (state: RootState) => state.data.clientDefinition; //TODO: change to  state.data.profile
export const selectPortfolios = (state: RootState) => state.data.portfolios;
export const selectPortfolioDetails = (state: RootState) => state.data.selectedPortfolio;
export const selectIsDataLoading = (state: RootState) => state.data.pending.length > 0;

export default dataSlice.reducer;
