import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-word-of-day',
  templateUrl: './word-of-day.component.html',
  styleUrls: ['./word-of-day.component.scss']
})
export class WordOfDayComponent  {

  constructor( private firestore : AngularFirestore,private toastr: ToastrService) { }

  seletedFile = null;

  wordForm = new FormGroup({
    word : new FormControl('', Validators.maxLength(50)),
    wordExplain : new FormControl('', Validators.maxLength(50))
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
      id: uuid(),
      title: 'word_of_the_day',
      description: this.wordForm.value,
      image : this.seletedFile,
      metadata: {
        date: date.toString(),
        time: date.getTime().toString(),
      },
    };
    this.firestore.collection('content').add(wordObject);
    this.toastr.success('Sucessfully Submitted to FireStore!!');
    console.log(wordObject);
  }


}
