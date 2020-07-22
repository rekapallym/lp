import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  constructor() { }
  
  pollForm = new FormGroup({
  question : new FormControl('Type your poll question here?', Validators.maxLength(50)),
  ans1 : new FormControl('option-1',Validators.maxLength(10)),
  ans2 : new FormControl('option-2',Validators.maxLength(10)),
  ans3 : new FormControl('option-3',Validators.maxLength(10)),
  ans4 : new FormControl('option-4',Validators.maxLength(10))
  });

  

  pollSubmit(){
    const date = new Date();
    const pollObject = {
    title: 'Poll',
    description: this.pollForm.value,
    metadata: {
      date: date.toString(),
      time: date.getTime().toString()
      } 
    }

    console.log(pollObject);
  }


  get f(){
    return this.pollForm.controls; 
  }

  ngOnInit(): void {
  }
}
