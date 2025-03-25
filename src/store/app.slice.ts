import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ISessionState {
  backUrl: string | null;
}

const initialState: ISessionState = {
  backUrl: null,
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBackUrl: (state, action) => {
      state.backUrl = action.payload;
      return;
    }
  }
});

export const selectBackUrl = (state: RootState) => state.app.backUrl;

export const { setBackUrl } = appSlice.actions;

export default appSlice.reducer;