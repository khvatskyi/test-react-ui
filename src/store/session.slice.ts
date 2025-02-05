import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { IUserContext, IUserResponse } from '../typings/models/user.models';
import { RootState } from '../store';
import { SessionStorageItems } from '../typings/enums/session-storage-items.enum';
import { deleteAllCookies } from '../utilities/cookies.utility';
import { useShowErrorNotification } from '../utilities/notifications.utility';

interface ISessionState {
  userContext: IUserContext | null;
  pending: boolean;
}

const serializedUserContext: string | null = sessionStorage.getItem(SessionStorageItems.UserContext);
const storedUserContext: IUserContext = serializedUserContext ? JSON.parse(serializedUserContext) : null;

const initialState: ISessionState = {
  userContext: storedUserContext || null,
  pending: false,
};

export const signInWithSSOCode = createAsyncThunk(
  'session/signIn',
  async (code: string, { dispatch, rejectWithValue }) => {
    const path = process.env.REACT_APP_API_ROOT + '/auth/get-sso-token';
    const params = new URLSearchParams({ code });
    const showErrorNotification = useShowErrorNotification();

    // MOCK
    // return Promise.resolve<IUserContext>(({
    //   accessToken: 'some_token',
    //   userName: 'Vasyl',
    //   email: 'test@test.test',
    //   name: 'Vasyl Prodanchuk',
    //   givenName: 'Given Vasyl',
    //   familyName: 'Family Vasyl',
    //   picture: null,
    //   hasProfile: true
    // }));
    // END of MOCK

    return await fetch(`${path}?${params.toString()}`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          showErrorNotification(`Error: ${response.statusText} (${response.status})`)
        } else {
          return response.json();
        }
      })
      .then((result: IUserResponse) => {
        const newUserContext: IUserContext = {
          accessToken: result.access_token,
          userName: result.username,
          email: result.email,
          name: result.name,
          givenName: result.given_name,
          familyName: result.family_name,
          picture: result.picture,
          hasProfile: result.has_profile,
        };
        return newUserContext;
      })
      .catch(e => {
        const error_message = `Error during sign in with SSO: ${e.message} `
        showErrorNotification(error_message)
        return rejectWithValue(error_message);
      });
  }
);

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUserContext: (state, action: PayloadAction<IUserContext>) => {
      state.userContext = action.payload;
      sessionStorage.setItem(SessionStorageItems.UserContext, JSON.stringify(action.payload));
    },
    clearUserContext: (state) => {
      state.userContext = null;
      sessionStorage.removeItem(SessionStorageItems.UserContext);
      deleteAllCookies();
    },
    updateProfileAvailability: (state, action: PayloadAction<boolean>) => {
      if (state.userContext) {
        state.userContext.hasProfile = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithSSOCode.pending, (state) => {
        state.pending = true;
      })
      .addCase(signInWithSSOCode.fulfilled, (state, action) => {
        state.userContext = action.payload;
        sessionStorage.setItem(SessionStorageItems.UserContext, JSON.stringify(action.payload));
        state.pending = false;
        window.location.href = '/'
      })
      .addCase(signInWithSSOCode.rejected, (state) => {
        state.pending = false;
      });
  }
});

export const { setUserContext, clearUserContext, updateProfileAvailability } = sessionSlice.actions;
export const selectUserContext = (state: RootState) => state.session.userContext;
export const selectIsPending = (state: RootState) => state.session.pending;

export default sessionSlice.reducer;