import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IPortfolioDetails } from '../typings/models/portfolio.models';
import { IClientDefinitionInfo, IClientProfileInfo } from '../typings/models/client-info.models';
import { IPortfolio } from '../typings/models/portfolio.models';
import { saveClientDefinition } from '../services/ai.service';
import { RootState } from '../store';
import { deletePortfolioRequest, getPortfolio, getPortfolios, savePortfolio } from '../services/portfolio.service';
import { getProfile, saveProfile } from '../services/profile.service';
import { updateProfileAvailability } from './session.slice';
import { STATE_CODES } from '../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';
import { getCompletedModules, fetchValueCreationModules } from '../services/data..service';
import { IValueCreationModel } from '../typings/models/business-model.models';

interface IDataState {
  clientDefinition: IClientDefinitionInfo | null;
  clientProfile: IClientProfileInfo | null;
  portfolios: IPortfolio[] | null;
  selectedPortfolio: IPortfolioDetails | null;
  completedModules: STATE_CODES[];
  valueCreationModels: IValueCreationModel[] | null;
  pending: boolean[];
}

const initialState: IDataState = {
  clientDefinition: null,
  clientProfile: null,
  portfolios: null,
  selectedPortfolio: null,
  completedModules: [],
  valueCreationModels: [],
  pending: []
};

export const loadProfileInfo = createAsyncThunk(
  'data/loadProfileInfo',
  async (_, { rejectWithValue }) => {

    return getProfile().catch(error => rejectWithValue(error));
  }
);

export const saveProfileInfo = createAsyncThunk(
  'data/saveProfileInfo',
  async (profile: IClientProfileInfo, { rejectWithValue }) => {

    return saveProfile(profile).catch(error => rejectWithValue(error));
  }
);

export const getSuccessfullyCompletedModules = createAsyncThunk(
  'data/getSuccessfullyCompletedModules',
  async (portfolioId: string, { rejectWithValue }) => {

    try {
      return await getCompletedModules(portfolioId);
    } catch (ex) {
      console.log(ex);
      return rejectWithValue(ex);
    }
  }
);

export const getValueCreationModules = createAsyncThunk(
  'data/getValueCreationModules',
  async (_, { rejectWithValue }) => {

    try {
      return await fetchValueCreationModules();
    } catch (ex) {
      console.log(ex);
      return rejectWithValue(ex);
    }
  }
);

export const deletePortfolio = createAsyncThunk(
  'data/deletePortfolio',
  async (portfolioId: string, { rejectWithValue, dispatch }) => {

    dispatch(setPending(true));

    try {
      return await deletePortfolioRequest(portfolioId);
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);
      return rejectWithValue(r);
    } finally {
      dispatch(setPending(false));
    }
  }
);

const completedModulesExtraReducers = (builder: ActionReducerMapBuilder<IDataState>) => {
  builder
  .addCase(getSuccessfullyCompletedModules.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(getSuccessfullyCompletedModules.fulfilled, (state, action) => {
    state.completedModules = action.payload;
    state.pending.pop();
  })
  .addCase(getSuccessfullyCompletedModules.rejected, (state) => {
    state.pending.pop();
  })
  .addCase(getValueCreationModules.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(getValueCreationModules.fulfilled, (state, action) => {
    state.valueCreationModels = action.payload;
    state.pending.pop();
  })
  .addCase(getValueCreationModules.rejected, (state) => {
    state.pending.pop();
  });
};

const profileExtraReducers = (builder: ActionReducerMapBuilder<IDataState>) => {
  builder
  .addCase(loadProfileInfo.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(loadProfileInfo.fulfilled, (state, action) => {
    state.clientProfile = action.payload;
    state.pending.pop();
  })
  .addCase(loadProfileInfo.rejected, (state) => {
    state.pending.pop();
  })
  .addCase(saveProfileInfo.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(saveProfileInfo.fulfilled, (state, action) => {
    state.clientProfile = action.payload;
    state.pending.pop();
  })
  .addCase(saveProfileInfo.rejected, (state) => {
    state.pending.pop();
  })
};

export const saveClientDefinitionInfo = createAsyncThunk(
  'data/saveClientDefinitionInfo',
  async (clientDefinition: IClientDefinitionInfo, { dispatch, rejectWithValue }) => {

    return saveClientDefinition(clientDefinition)
      .then(result => {
        dispatch(updateProfileAvailability(true));
        return result;
      })
      .catch(error => {
        return rejectWithValue(error);
      });
  }
);

const clientDefinitionExtraReducers = (builder: ActionReducerMapBuilder<IDataState>) => {
  builder
  .addCase(saveClientDefinitionInfo.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(saveClientDefinitionInfo.fulfilled, (state, action) => {
    state.clientDefinition = {
      name: action.payload.name,
      description: action.payload.description,
      industry: action.payload.industry,
      size: action.payload.size,
      coreProducts: action.payload.coreProducts
    };
    state.clientProfile = action.payload;
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
  .addCase(deletePortfolio.pending, (state) => {
    state.pending.push(true);
  })
  .addCase(deletePortfolio.fulfilled, (state, action) => {
    state.portfolios = state.portfolios.filter(portfolio => portfolio.id !== action.payload);
    state.pending.pop();
  })
  .addCase(deletePortfolio.rejected, (state) => {
    state.pending.pop();
  })
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setClientDefinitionInfo: (state, action) => {
      state.clientDefinition = action.payload
    },
    clearClientProfile: (state) => {
      state.clientProfile = null;
    },
    clearPortfolioDetails: (state) => {
      state.selectedPortfolio = null;
    },
    setPending: (state, action) => {
      if (action.payload) {
        state.pending.push(true);
        return;
      }

      state.pending.pop();
    },
    addCompletedModule: (state, action) => {
      if (!state.completedModules.find(x => x === action.payload)) {
        state.completedModules.push(action.payload);
      }
    },
    removeCompletedModule: (state, action) => {
      const index = state.completedModules.findIndex(x => x === action.payload);

      if (index > -1) {
        state.completedModules.splice(index, 1);
      }
    }
  },
  extraReducers: (builder) => {
    profileExtraReducers(builder);
    clientDefinitionExtraReducers(builder);
    portfolioExtraReducers(builder);
    completedModulesExtraReducers(builder);
  }
});

export const selectClientDefinition = (state: RootState) => state.data.clientDefinition;
export const selectProfile = (state: RootState) => state.data.clientProfile;
export const selectPortfolios = (state: RootState) => state.data.portfolios;
export const selectPortfolioDetails = (state: RootState) => state.data.selectedPortfolio;
export const selectIsDataLoading = (state: RootState) => state.data.pending.length > 0;
export const selectCompletedModules = (state: RootState) => state.data.completedModules;
export const selectValueCreationModels = (state: RootState) => state.data.valueCreationModels;

export const { setClientDefinitionInfo, clearClientProfile, clearPortfolioDetails, setPending, addCompletedModule, removeCompletedModule } = dataSlice.actions;

export default dataSlice.reducer;
