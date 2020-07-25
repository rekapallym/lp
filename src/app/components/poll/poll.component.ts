import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuid } from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  constructor(private firestore : AngularFirestore, private toastr: ToastrService) { }
  
  pollForm = new FormGroup({
  question : new FormControl('', Validators.maxLength(50)),
  ans1 : new FormControl('',Validators.maxLength(10)),
  ans2 : new FormControl('',Validators.maxLength(10)),
  ans3 : new FormControl('',Validators.maxLength(10)),
  ans4 : new FormControl('',Validators.maxLength(10))
  });

  

  pollSubmit(){
    const date = new Date();
    const pollObject = {
    id: uuid(),
    title: 'Poll',
    description: this.pollForm.value,
    metadata: {
      date: date.toDateString(),
      time: date.getTime().toString()
      } 
    }
    this.firestore.collection('content').add(pollObject);
    this.toastr.success('Sucessfully Submitted to FireStore!!');


    console.log(pollObject);
  }


  get f(){
    return this.pollForm.controls; 
  }

  ngOnInit(): void {
  }
}
