import {Breed} from "./breed.model";

export interface Cat {
  id: string,
  url: string,
  width: number,
  height: number,
  breeds: Breed[]
}
