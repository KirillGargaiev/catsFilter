import {Component, Input, OnInit} from '@angular/core';
import {Cat} from "../models/cat.model";

@Component({
  selector: 'app-cat-item',
  templateUrl: './cat-item.component.html',
  styleUrls: ['./cat-item.component.css']
})


export class CatItemComponent implements OnInit {

  constructor() { }

  @Input() cat : Cat = {
    id: '',
    url: '',
    width: 0,
    height: 0,
    breeds: [{
      weight: {},
      id:'',
      name:'',
      temperament:'',
      origin:'',
      country_codes:'',
      country_code:'',
      life_span:'',
      wikipedia_url:''
    }]
  }

  ngOnInit(): void {
  }

}
