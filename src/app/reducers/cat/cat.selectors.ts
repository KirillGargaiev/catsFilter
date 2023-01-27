import {createFeatureSelector, createSelector} from "@ngrx/store";
import {catState} from "./cat.reducer";
import {Cat} from "../../models/cat.model";
import {filterOptions} from "../../models/filter.model";

export const selectCatFeature = createFeatureSelector<catState>('catsState')

export const selectCatsList = createSelector(
  selectCatFeature,
  (state: catState): Cat[] => state.cats
)

export const selectCatsFilteredList = createSelector(
  selectCatFeature,
  (state: catState): Cat[] => state.filteredCats
)
export const selectCatsLimit = createSelector(
  selectCatFeature,
  (state: catState): number => state.limit
)

export const selectCatsLoading = createSelector(
  selectCatFeature,
  (state: catState): boolean => state.loading
)

export const selectCatsLoaded = createSelector(
  selectCatFeature,
  (state: catState): boolean => state.loaded
)

export const selectBreedsList = createSelector(
  selectCatFeature,
  (state: catState): string[] => state.breeds
)

export const selectMinHeight = createSelector(
  selectCatFeature,
  (state: catState): number => state.minHeight
)

export const selectMaxHeight = createSelector(
  selectCatFeature,
  (state: catState): number => state.maxHeight
)

export const selectMinWidth = createSelector(
  selectCatFeature,
  (state: catState): number => state.minWidth
)

export const selectMaxWidth = createSelector(
  selectCatFeature,
  (state: catState): number => state.maxWidth
)

export const selectFilter = createSelector(
  selectCatFeature,
  (state: catState): filterOptions => state.filterOptions
)
