import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-fun-fact',
  templateUrl: './fun-fact.component.html',
  styleUrls: ['./fun-fact.component.scss']
})
export class FunFactComponent implements OnInit {

  constructor() { }

  funFactForm = new FormGroup({
    question : new FormControl(),
    ans: new FormControl()
  })

  funFactSubmit(){
    console.log(this.funFactForm.value)
  }

  ngOnInit(): void {
  }

}
