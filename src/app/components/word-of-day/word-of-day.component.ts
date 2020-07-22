import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-word-of-day',
  templateUrl: './word-of-day.component.html',
  styleUrls: ['./word-of-day.component.scss']
})
export class WordOfDayComponent  {

  constructor() { }

  seletedFile = null;

  wordForm = new FormGroup({
    word : new FormControl('Enter thought of the day here', Validators.maxLength(50))
  })

  get f(){
    return this.wordForm.controls; 
  }

  onFileSelected(event) {
    this.seletedFile = event.target.files[0];
  }
  onSubmit(){
    let date = new Date();
    const wordObject = {
      title: 'word_of_the_day',
      description: this.wordForm.value,
      image : this.seletedFile,
      metadata: {
        date: date.toString(),
        time: date.getTime().toString(),
      },
    };
    console.log(wordObject);
  }


}
