import {Action} from "@ngrx/store";
import {Cat} from "../../models/cat.model";
import {filterOptions} from "../../models/filter.model";

export enum catActionsType {
  fetch = '[CAT] fetch all',
  fetchSuccess = '[CAT] fetch success',
  fetchFailure = '[CAT] fetch failure',
  filter = '[CAT] filter list',
  setFilter = '[CAT] set filter',
  reset = '[CAT] clear filter',
  getBreeds = '[CAT] get breeds',
  getMinHeight = '[CAT] get minimal height',
  getMaxHeight = '[CAT] get maximal height',
  getMinWidth = '[CAT] get minimal width',
  getMaxWidth = '[CAT] get maximal width',

  setLimit = '[CAT] set limit'

}

export class CatFetchAll implements Action {
  readonly type = catActionsType.fetch;
}

export class CatFetchAllSuccess implements Action {
  readonly type = catActionsType.fetchSuccess;

  constructor(public payload: { cats: Cat[] }) {
  }

}

export class CatFetchAllFailure implements Action {
  readonly type = catActionsType.fetchFailure;
}


export class CatGetBreeds implements Action {
  readonly type = catActionsType.getBreeds;

  constructor(public payload: string[]) {
  }

}

export class CatFilter implements Action {
  readonly type = catActionsType.filter;

  constructor(public payload: Cat[]) {
  }
}

export class SetFilter implements Action {
  readonly type = catActionsType.setFilter;

  constructor(public payload: filterOptions) {
  }
}

export class GetMinHeight implements Action {
  readonly type = catActionsType.getMinHeight;

  constructor(public payload: number) {

  }
}

export class GetMaxHeight implements Action {
  readonly type = catActionsType.getMaxHeight;

  constructor(public payload: number) {

  }
}

export class GetMinWidth implements Action {
  readonly type = catActionsType.getMinWidth;

  constructor(public payload: number) {

  }
}

export class GetMaxWidth implements Action {
  readonly type = catActionsType.getMaxWidth;

  constructor(public payload: number) {

  }
}

export class ResetFilter implements Action {
  readonly type = catActionsType.reset;
}

export class SetLimit implements Action {
  readonly type = catActionsType.setLimit;

  constructor(public payload: number) {
  }
}


export type CatActions = CatFetchAll
  | CatFilter
  | CatFetchAllSuccess
  | CatFetchAllFailure
  | CatGetBreeds
  | GetMinHeight
  | GetMaxHeight
  | GetMinWidth
  | GetMaxWidth
  | ResetFilter
  | SetFilter
  | SetLimit
