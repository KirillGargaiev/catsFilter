import {ActionReducerMap} from "@ngrx/store";
import {catReducer, catState, initialState} from "./cat/cat.reducer";

export interface appState {
  catsState: catState;
}

export const initialAppState: appState = {
  catsState: initialState
}

export const appReducers: ActionReducerMap<appState, any> = {
  catsState: catReducer
}
