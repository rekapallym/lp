import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-aptittude',
  templateUrl: './aptittude.component.html',
  styleUrls: ['./aptittude.component.scss']
})
export class AptittudeComponent  {

  constructor() { }

  appForm = new FormGroup({
    question : new FormControl('Type your Aptitude question here?', Validators.maxLength(50)),
    ans1 : new FormControl('option-1', Validators.maxLength(10)),
    ans2 : new FormControl('option-2', Validators.maxLength(10)),
    ans3 : new FormControl('option-3', Validators.maxLength(10)),
    ans4 : new FormControl('option-4', Validators.maxLength(10))
    });

    onSubmit(){
      const date = new Date();
      const appObject = {
    title: 'aptitude',
    description: this.appForm.value,
    metadata: {
      date: date.toString(),
      time: date.getTime().toString()
      }
    };

      console.log(appObject);
    }

    get f(){
      return this.appForm.controls;
    }
}
