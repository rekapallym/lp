import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  constructor() { }
  
  pollForm = new FormGroup({
  question : new FormControl(),
  ans1 : new FormControl(),
  ans2 : new FormControl(),
  ans3 : new FormControl(),
  ans4 : new FormControl()
  });

  pollSubmit(){
    console.log(this.pollForm.value);
  }

  ngOnInit(): void {
  }
}
