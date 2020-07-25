import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-tought-of-day',
  templateUrl: './tought-of-day.component.html',
  styleUrls: ['./tought-of-day.component.scss']
})
export class ToughtOfDayComponent {
  constructor( private firestore : AngularFirestore,private toastr: ToastrService) { }


  seletedFile = null;

  thoughtForm = new FormGroup({
    content : new FormControl('', Validators.maxLength(50))
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
      id: uuid(),
      title: 'thought_of_the_day',
      description: this.thoughtForm.value,
      image : this.seletedFile,
      metadata: {
        date: date.toDateString(),
        time: date.getTime().toString(),
      },
    };
    this.firestore.collection('content').add(toughtObject);
    this.toastr.success('Sucessfully Submitted to FireStore!!');

    console.log(toughtObject);
  }

}
