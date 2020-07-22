import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent  {

  constructor() { }
  
  announceForm = new FormGroup({
    announcement : new FormControl('Enter new Announcements', Validators.maxLength(50))
    });

    onSubmit(){

      const date = new Date();
      const announceObject = {
    title: 'announcement',
    description: this.announceForm.value,
    metadata: {
      date: date.toString(),
      time: date.getTime().toString()
      }
    };
      console.log(announceObject);
    }

    get f(){
      return this.announceForm.controls;
    }
}
