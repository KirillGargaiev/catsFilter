import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {catState} from "../reducers/cat/cat.reducer";
import {Observable} from "rxjs";
import {Cat} from "../models/cat.model";
import {
  selectCatsFilteredList,
  selectCatsLimit,
  selectCatsLoaded
} from "../reducers/cat/cat.selectors";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private store$: Store<catState>) { }
  public cats$: Observable<Cat[]> = this.store$.pipe(
    select(selectCatsFilteredList)
  )

  public limit$: Observable<number> = this.store$.pipe(
    select(selectCatsLimit)
  )

  public loaded$: Observable<boolean> = this.store$.pipe(
    select(selectCatsLoaded)
  )



  ngOnInit(): void {
  }

}
