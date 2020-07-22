import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-tought-of-day',
  templateUrl: './tought-of-day.component.html',
  styleUrls: ['./tought-of-day.component.scss']
})
export class ToughtOfDayComponent {

  seletedFile = null;

  thoughtForm = new FormGroup({
    content : new FormControl('Enter thought of the day here', Validators.maxLength(50))
  })

  get f(){
    return this.thoughtForm.controls; 
  }

  onFileSelected(event) {
    this.seletedFile = event.target.files[0];
  }
  onSubmit(){
    let date = new Date();
    const toughtObject = {
      title: 'thought_of_the_day',
      description: this.thoughtForm.value,
      image : this.seletedFile,
      metadata: {
        date: date.toString(),
        time: date.getTime().toString(),
      },
    };
    console.log(toughtObject);
  }

}
