import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { IProfileInfo } from '../pages/provider/ProfileTypes';
import { fetchWithAuth } from '../utilities/fetchWithAuth.utility';
import { useAppSelector } from '../hooks';
import { IPortfolio } from '../models/portfolio.model';
import { selectUserContext } from './session.slice';

interface IDataState {
  profile: IProfileInfo | null;
  portfolios: IPortfolio[] | null;
  pending: boolean;
}

const initialState: IDataState = {
  profile: null,
  portfolios: null,
  pending: false
}

export const getProfileInfo = createAsyncThunk(
  'data/getProfileInfo',
  async (_, { rejectWithValue }) => {
    const basePath = process.env.REACT_APP_API_ROOT + '/api/profile';
    const accessToken = useAppSelector(selectUserContext)?.accessToken!;

    return await fetchWithAuth(basePath, accessToken, {
      method: 'GET'
    })
      .then(response => response.json())
      .catch(error => {
        return rejectWithValue(error);
      });
  }
);

const profileExtraReducers = (builder: ActionReducerMapBuilder<IDataState>) => {
  builder
  .addCase(getProfileInfo.pending, (state) => {
    state.pending = true;
  })
  .addCase(getProfileInfo.fulfilled, (state, action) => {
    state.profile = action.payload as IProfileInfo;
    state.pending = false;
    window.location.href = "/provider-context";
  })
  .addCase(getProfileInfo.rejected, (state) => {
    state.pending = false;
  });
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    profileExtraReducers(builder);
  }
});

export default dataSlice.reducer;