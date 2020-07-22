import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fun-fact',
  templateUrl: './fun-fact.component.html',
  styleUrls: ['./fun-fact.component.scss']
})
export class FunFactComponent implements OnInit {

  constructor() { }

  funFactForm = new FormGroup({
    question : new FormControl('Enter Fun Fact Here', Validators.maxLength(50)),
    ans: new FormControl('Fun Fact Answer', Validators.maxLength(25))
  })

  funFactSubmit(){
    const date = new Date();
    const funFactObject = {
    title: 'funFact',
    description: this.funFactForm.value,
    metadata: {
      date: date.toString(),
      time: date.getTime().toString()
      }
    };

    console.log(funFactObject);

  }

  get f(){
    return this.funFactForm.controls;
  }

  ngOnInit(): void {
  }

}
