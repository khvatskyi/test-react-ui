import { IPortfolioRequest } from '../typings/models/module.models';

import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteGoalInGoalsAndKPIsRequest, deleteObjectiveInGoalsAndKPIsRequest, getGoalsAndKPIsRequest, initGoalsAndKPIsRequest, insertGoalInGoalsAndKPIsRequest, insertObjectiveInGoalsAndKPIsRequest, updateGoalInGoalsAndKPIsRequest, updateKPIsInGoalsAndKPIsRequest, updateObjectiveInGoalsAndKPIsRequest } from "../services/goals-and-kpis.service";
import { IGoalAddRequest, IGoalDeleteRequest, IGoalEditRequest, IKpisUpdateRequest, IObjectiveAddRequest, IObjectiveDeleteRequest, IObjectiveEditRequest } from '../typings/models/goals-and-kpis.model';
import { IAiState } from './ai.slice';

export const initGoalsAndKPIs = createAsyncThunk(
  'data/initGoalsAndKPIs',
  async (context: IPortfolioRequest, { rejectWithValue }) => {

    try {
      const response = await initGoalsAndKPIsRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);


export const getGoalsAndKPIs = createAsyncThunk(
  'data/getGoalsAndKPIs',
  async (context: IPortfolioRequest, { rejectWithValue }) => {

    try {
      const response = await getGoalsAndKPIsRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const insertGoalInGoalsAndKPIs = createAsyncThunk(
  'data/insertGoalInGoalsAndKPIs',
  async (context: IGoalAddRequest, { rejectWithValue }) => {

    try {
      const response = await insertGoalInGoalsAndKPIsRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);


export const updateGoalInGoalsAndKPIs = createAsyncThunk(
  'data/updateGoalInGoalsAndKPIs',
  async (context: IGoalEditRequest, { rejectWithValue }) => {

    try {
      const response = await updateGoalInGoalsAndKPIsRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const deleteGoalInGoalsAndKPIs = createAsyncThunk(
  'data/deleteGoalInGoalsAndKPIs',
  async (context: IGoalDeleteRequest, { rejectWithValue }) => {

    try {
      const response = await deleteGoalInGoalsAndKPIsRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const insertObjectiveInGoalsAndKPIs = createAsyncThunk(
  'data/insertObjectiveInGoalsAndKPIs',
  async (context: IObjectiveAddRequest, { rejectWithValue }) => {

    try {
      const response = await insertObjectiveInGoalsAndKPIsRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);


export const updateObjectiveInGoalsAndKPIs = createAsyncThunk(
  'data/updateObjectiveInGoalsAndKPIs',
  async (context: IObjectiveEditRequest, { rejectWithValue }) => {

    try {
      const response = await updateObjectiveInGoalsAndKPIsRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const deleteObjectiveInGoalsAndKPIs = createAsyncThunk(
  'data/deleteObjectiveInGoalsAndKPIs',
  async (context: IObjectiveDeleteRequest, { rejectWithValue }) => {

    try {
      const response = await deleteObjectiveInGoalsAndKPIsRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);

export const updateKPIsInGoalsAndKPIs = createAsyncThunk(
  'data/updateKPIsInGoalsAndKPIs',
  async (context: IKpisUpdateRequest, { rejectWithValue }) => {

    try {
      const response = await updateKPIsInGoalsAndKPIsRequest(context);
      return response;
    } catch (r) {
      const errorText = r.cause?.body?.detail ?? r.message;
      console.log(errorText);

      return rejectWithValue(r);
    }
  }
);



export const goalsAndKPIsReducers = (builder: ActionReducerMapBuilder<IAiState>) => {
  builder
  .addCase(initGoalsAndKPIs.fulfilled, (state, action) => {
    state.GoalsAndKPIs = action.payload;      
  })
  .addCase(getGoalsAndKPIs.fulfilled, (state, action) => {
    state.GoalsAndKPIs = action.payload;
  })
  .addCase(insertGoalInGoalsAndKPIs.fulfilled, (state, action) => {
    state.GoalsAndKPIs.goals.push(action.payload);
  })
  .addCase(updateGoalInGoalsAndKPIs.fulfilled, (state, action) => {
    const goalToUpdate = state.GoalsAndKPIs.goals.find(goal => goal.goalId === action.payload.goalId);
    if (goalToUpdate) {
      goalToUpdate.description = action.payload.description;
    }    
  })
  .addCase(deleteGoalInGoalsAndKPIs.fulfilled, (state, action) => {
    const index = state.GoalsAndKPIs.goals.findIndex(item => item.goalId === action.payload.goalId);
    if (index !== -1) {
      state.GoalsAndKPIs.goals.splice(index, 1);
    }
  })

  .addCase(insertObjectiveInGoalsAndKPIs.fulfilled, (state, action) => {
    state.GoalsAndKPIs.objectives.push(action.payload);
  })
  .addCase(updateObjectiveInGoalsAndKPIs.fulfilled, (state, action) => {
    const goalToUpdate = state.GoalsAndKPIs.objectives.find(item => item.objectiveId === action.payload.objectiveId);
    if (goalToUpdate) {
      goalToUpdate.description = action.payload.description;
    }    
  })
  .addCase(deleteObjectiveInGoalsAndKPIs.fulfilled, (state, action) => {
    const index = state.GoalsAndKPIs.objectives.findIndex(item => item.objectiveId === action.payload.objectiveId);
    if (index !== -1) {
      state.GoalsAndKPIs.objectives.splice(index, 1);
    }
  })
  // .addCase(updateKPIsInGoalsAndKPIs.fulfilled, (state, action) => {
  //   state.GoalsAndKPIs.kpis = action.payload;
  // })

};


