import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, withLatestFrom} from "rxjs";
import {Cat} from "../models/cat.model"
import {filterOptions} from "../models/filter.model";

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private http: HttpClient) {
  }


  API_KEY = "live_DYKSFpLkBqYnjQesPwBbLVm3NiH8oMrjDMTXvrIcGyDtcBiUGLYuWFLE3TLQrMCi"
  limit = 20


  getAllCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(`https://api.thecatapi.com/v1/images/search?limit=${this.limit}&has_breeds=1&api_key=${this.API_KEY}`)
  }

  getBreeds(cats: Observable<Cat[]>): Observable<string[]> {
    return cats.pipe(
      map((el) => el.map((obj) => obj.breeds[0].name).filter((value, index, array) => array.indexOf(value) === index)),
    )
  }

  minHeight(cats: Observable<Cat[]>): Observable<number[]> {
    return cats.pipe(
      map((el) => el.map((obj) => obj.height).sort((a, b) => a - b).slice(0, 1)
      ))
  }

  maxHeight(cats: Observable<Cat[]>): Observable<number[]> {
    return cats.pipe(
      map((el) => el.map((obj) => obj.height).sort((a, b) => b - a).slice(0, 1)
      ))
  }

  minWidth(cats: Observable<Cat[]>): Observable<number[]> {
    return cats.pipe(
      map((el) => el.map((obj) => obj.width).sort((a, b) => a - b).slice(0, 1)
      ))
  }

  maxWidth(cats: Observable<Cat[]>): Observable<number[]> {
    return cats.pipe(
      map((el) => el.map((obj) => obj.width).sort((a, b) => b - a).slice(0, 1)
      ))
  }

  filterCats(cats: Observable<Cat[]>, filterOption: Observable<filterOptions>): Observable<Cat[]> {
    return cats.pipe(
      withLatestFrom(filterOption),
      map(([first, second]) => first.filter(
        obj =>
        second.breeds.includes(obj.breeds[0].name)
          &&
          second.minHeight <= obj.height &&
          second.maxHeight >= obj.height &&
          second.minWidth <= obj.width &&
          second.maxWidth >= obj.width
        )),

    )
  }
}
