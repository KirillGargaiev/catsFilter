import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {catState} from "../reducers/cat/cat.reducer";
import {Observable} from "rxjs";
import {
  selectBreedsList,
  selectCatsLimit,
  selectMaxHeight, selectMaxWidth,
  selectMinHeight, selectMinWidth
} from "../reducers/cat/cat.selectors";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CatService} from "../services/cat.service";
import {ResetFilter, SetFilter, SetLimit} from "../reducers/cat/cat.actions";

@Component({
  selector: 'app-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.css']
})
export class FilterFieldComponent implements OnInit {

  form!: FormGroup
  constructor(private store$: Store<catState>, private fb: FormBuilder, private service: CatService) {
    this.form = this.fb.group({
      breeds: this.fb.array([]),
      minHeight: new FormControl(),
      maxHeight: new FormControl(),
      minWidth: new FormControl(),
      maxWidth: new FormControl()
    })
  }

  public minHeight$: Observable<number> = this.store$.pipe(
    select(selectMinHeight)
  )

  public maxHeight$: Observable<number> = this.store$.pipe(
    select(selectMaxHeight),
  )

  public minWidth$: Observable<number> = this.store$.pipe(
    select(selectMinWidth)
  )

  public maxWidth$: Observable<number> = this.store$.pipe(
    select(selectMaxWidth)
  )
  public breeds$: Observable<string[]> = this.store$.pipe(
    select(selectBreedsList)
  )

  public limit$: Observable<number> = this.store$.pipe(
    select(selectCatsLimit)
  )

  ngOnInit(): void {
  }

  submit(){
    this.store$.dispatch(new SetFilter(this.form.value))
  }

  reset(){
    this.store$.dispatch(new ResetFilter())
    this.form.get('breeds')
  }

  handleBreed(event: any) {
    let breed = this.form.get('breeds') as FormArray
    if (event.checked){
      if (event.source['_elementRef'].nativeElement.innerText != 'Все породы')
      breed.push(new FormControl(event.source['_elementRef'].nativeElement.innerText))
    }
    else {
      let i = 0;
      breed.controls.forEach((l: any) => {
        if (l.value == event.source['_elementRef'].nativeElement.innerText){
          breed.removeAt(i)
          return
        }
        i++
      })
    }
  }

  setLimit(event: any) {
    this.store$.dispatch(new SetLimit(event.value))
  }

}
