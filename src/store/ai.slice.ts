import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IAiContext } from '../models/ai.models';

export interface AiState {
    aiContext: IAiContext[];
    isLoading: boolean;
}

type StateModel = AiState;

const initialState: StateModel = {
    aiContext: [],
    isLoading: false
};



export const aiSlice = createSlice({
    name: 'ai',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: { },
    extraReducers: builder => {
        builder.addCase(incrementAsync.pending, state => {
            state.status = 'loading'
        })
    }
})

export const {  } = aiSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const lastAiResponse = (state: RootState) => state.ai.aiContext.at(-1)?.content ?? null;

export default aiSlice.reducer