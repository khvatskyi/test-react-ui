import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { IUserContext, IUserResponse } from '../typings/models/user.models';
import { RootState } from '../store';
import { SessionStorageItems } from '../typings/enums/session-storage-items.enum';

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
  async (code: string, { rejectWithValue }) => {
    const path = process.env.REACT_APP_API_ROOT + '/auth/get-sso-token';
    const params = new URLSearchParams({ code });

    return await fetch(`${path}?${params.toString()}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((result: IUserResponse) => {
        const newUserContext: IUserContext = {
          accessToken: result.access_token,
          userName: result.username,
          email: result.email,
          name: result.name,
          givenName: result.given_name,
          familyName: result.family_name,
          picture: result.picture,
          isProfileExist: result.is_profile_exist,
        };
        return newUserContext;
      })
      .catch(error => {
        return rejectWithValue('Error during sign in with SSO');
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
        window.location.href =  state.userContext.isProfileExist ?  '/' : '/profile';
      })
      .addCase(signInWithSSOCode.rejected, (state) => {
        state.pending = false;
      });
  }
});

export const { setUserContext, clearUserContext } = sessionSlice.actions;
export const selectUserContext = (state: RootState) => state.session.userContext;
export const selectIsPending = (state: RootState) => state.session.pending;

export default sessionSlice.reducer;