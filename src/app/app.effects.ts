import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType, OnInitEffects, } from "@ngrx/effects";
import {CatService} from "./services/cat.service";
import {
  catActionsType,
  CatFetchAll,
  CatFetchAllFailure,
  CatFetchAllSuccess, CatFilter, CatGetBreeds, GetMaxHeight, GetMaxWidth, GetMinHeight, GetMinWidth,
} from "./reducers/cat/cat.actions";
import {catchError, filter, map, mergeMap, Observable, of, skip, switchMap, take} from "rxjs";
import {Action, select, Store} from "@ngrx/store";
import {Cat} from "./models/cat.model";
import {selectCatsList, selectFilter} from "./reducers/cat/cat.selectors";
import {filterOptions} from "./models/filter.model";


@Injectable()
export class AppEffects  implements OnInitEffects{

  constructor(private actions$: Actions, private catService: CatService, private store$: Store) {}

  public cats$: Observable<Cat[]> = this.store$.pipe(
    select(selectCatsList)
  )

  public filterOption$: Observable<filterOptions> = this.store$.pipe(
    select(selectFilter)
  )


  fetchCats$ = createEffect(()=> this.actions$.pipe(
    ofType(catActionsType.fetch),
    mergeMap(() => this.catService.getAllCats()
      .pipe(
        map(cats => new CatFetchAllSuccess({cats})),
        catchError(()=> of(new CatFetchAllFailure()))
      ))
  ))

  getBreeds = createEffect(()=> this.actions$.pipe(
    ofType(catActionsType.fetchSuccess),
    mergeMap(()=>this.catService.getBreeds(this.cats$)
      .pipe(
        map(breeds => new CatGetBreeds(breeds))
      ))
  ))

  getMinHeight = createEffect(() => this.actions$.pipe(
    ofType(catActionsType.fetchSuccess),
    mergeMap(()=> this.catService.minHeight(this.cats$)
      .pipe(
        map(minHeight => new GetMinHeight(minHeight[0]))
      ))
  ))

  getMaxHeight = createEffect(() => this.actions$.pipe(
    ofType(catActionsType.fetchSuccess),
    mergeMap(()=> this.catService.maxHeight(this.cats$)
      .pipe(
        map(minHeight => new GetMaxHeight(minHeight[0]))
      ))
  ))

  getMinWidth = createEffect(() => this.actions$.pipe(
    ofType(catActionsType.fetchSuccess),
    mergeMap(()=> this.catService.minWidth(this.cats$)
      .pipe(
        map(minHeight => new GetMinWidth(minHeight[0]))
      ))
  ))

  getMaxWidth = createEffect(() => this.actions$.pipe(
    ofType(catActionsType.fetchSuccess),
    mergeMap(()=> this.catService.maxWidth(this.cats$)
      .pipe(
        map(minHeight => new GetMaxWidth(minHeight[0]))
      ))
  ))

  filterCats = createEffect(()=>this.actions$.pipe(
    ofType(catActionsType.setFilter),
      switchMap(()=>this.catService.filterCats(this.cats$, this.filterOption$)
      .pipe(
        take(1),
        map(filteredList => new CatFilter(filteredList)),
      ))
  ),

  )


  ngrxOnInitEffects(): Action {
    return new CatFetchAll;
  }
}
