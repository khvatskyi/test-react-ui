import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IProfileInfo } from '../pages/profile/Profile.models';
import { IPortfolio } from '../models/portfolio.model';
import { getProfile, saveProfile } from '../services/profile.service';
import { RootState } from '../store';
import { getPortfolio, getPortfolios, savePortfolio } from '../services/portfolio.service';
import { IPortfolioDetails } from '../pages/portfolioDetails/portfolioDetails.models';

interface IDataState {
  profile: IProfileInfo | null;
  portfolios: IPortfolio[] | null;
  selectedPortfolio: IPortfolioDetails | null;
  pending: boolean[];
}

const initialState: IDataState = {
  profile: null,
  portfolios: null,
  selectedPortfolio: null,
  pending: []
}

export const loadProfileInfo = createAsyncThunk(
  'data/loadProfileInfo',
  async (_, { rejectWithValue }) => {

    return getProfile().catch(error => rejectWithValue(error));
  }
);

export const saveProfileInfo = createAsyncThunk(
  'data/saveProfileInfo',
  async (profile: IProfileInfo, { rejectWithValue }) => {

    return saveProfile(profile).catch(error => rejectWithValue(error));
  }
);

const profileExtraReducers = (builder: ActionReducerMapBuilder<IDataState>) => {
  builder
  .addCase(loadProfileInfo.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(loadProfileInfo.fulfilled, (state, action) => {
    state.profile = action.payload as IProfileInfo;
    state.pending.pop();

    // window.location.href = "/provider-context";
  })
  .addCase(loadProfileInfo.rejected, (state) => {
    state.pending.pop();
  })
  .addCase(saveProfileInfo.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(saveProfileInfo.fulfilled, (state, action) => {
    state.profile = action.payload as IProfileInfo;
    state.pending.pop();
  })
  .addCase(saveProfileInfo.rejected, (state) => {
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
    profileExtraReducers(builder);
    portfolioExtraReducers(builder);
  }
});

export const selectProfile = (state: RootState) => state.data.profile;
export const selectPortfolios = (state: RootState) => state.data.portfolios;
export const selectPortfolioDetails = (state: RootState) => state.data.selectedPortfolio;
export const selectIsDataLoading = (state: RootState) => state.data.pending.length > 0;

export default dataSlice.reducer;
