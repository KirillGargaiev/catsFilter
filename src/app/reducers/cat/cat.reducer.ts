import {Cat} from "../../models/cat.model";
import {CatActions, catActionsType} from "./cat.actions";
import {filterOptions} from "../../models/filter.model";

export interface catState {
  cats: Cat[],
  filteredCats: Cat[],
  limit: number,
  breeds: string[],
  minHeight: number,
  maxHeight: number,
  minWidth: number,
  maxWidth: number,
  filterOptions: filterOptions
  loading: boolean,
  loaded: boolean
}

export const initialState: catState = {
  cats: [],
  filteredCats: [],
  limit: 10,
  breeds: [],
  minHeight: 0,
  maxHeight: 0,
  minWidth: 0,
  maxWidth: 0,
  filterOptions: {
    breeds: [],
    minHeight: 0,
    maxHeight: 0,
    minWidth: 0,
    maxWidth: 0
  },
  loaded: false,
  loading: false
}

export const catReducer = (
  state = initialState,
  action: CatActions): catState => {
  switch (action.type){
    case catActionsType.fetch: {
      return {
        ...state,
        loaded: false,
        loading: true
      }
    }
    case catActionsType.fetchSuccess: {
      return {
        ...state,
        cats: action.payload.cats,
        filteredCats: action.payload.cats,
        loaded: true,
        loading: false
      }
    }
    case catActionsType.fetchFailure: {
      return {
        ...state,
        cats: [],
        filteredCats : [],
        loaded: true,
        loading: false
      }
    }
    case catActionsType.getBreeds: {
      return {
        ...state,
        breeds: action.payload,
        loaded: true,
        loading: false
      }
    }
    case catActionsType.getMinHeight: {
      return {
        ...state,
        minHeight: action.payload
      }
    }
    case catActionsType.getMaxHeight: {
      return {
        ...state,
        maxHeight: action.payload
      }
    }
    case catActionsType.getMinWidth: {
      return {
        ...state,
        minWidth: action.payload
      }
    }
    case catActionsType.getMaxWidth: {
      return {
        ...state,
        maxWidth: action.payload
      }
    }
    case catActionsType.setFilter: {
      return {
        ...state,
        loading: true,
        loaded: false,
        filterOptions: action.payload
      }
    }
    case catActionsType.filter: {
      return {
        ...state,
        loaded: true,
        loading: false,
        filteredCats: action.payload
      }
    }
    case catActionsType.reset: {
      return {
        ...state,
        filteredCats: state.cats
      }
    }
    case catActionsType.setLimit: {
      return {
        ...state,
        limit: action.payload
      }
    }
    default:
      return state
  }

}


