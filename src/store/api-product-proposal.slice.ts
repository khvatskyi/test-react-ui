import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiProductProposalRequest, initApiProductProposalRequest } from "../services/api-product-proposal.service";
import { IGetProductProposalRequest, IProductProposalRequest } from "../typings/models/api-product-proposal.models";
import { IAiState } from "./ai.slice";


export const initApiProductProposal = createAsyncThunk(
  'data/initApiProductProposal',
  async (context: IProductProposalRequest, { rejectWithValue }) => {

    try {
      const response = await initApiProductProposalRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);


export const getApiProductProposal = createAsyncThunk(
  'data/getApiProductProposal',
  async (context: IGetProductProposalRequest, { rejectWithValue }) => {

    try {
      const response = await getApiProductProposalRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);


export const apiProductProposalReducers = (builder: ActionReducerMapBuilder<IAiState>) => {
  builder
  .addCase(initApiProductProposal.fulfilled, (state, action) => {
    state.ProductProposal = action.payload;
  })
  .addCase(getApiProductProposal.fulfilled, (state, action) => {
    state.ProductProposal = action.payload;
  })

};


