import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-aptittude',
  templateUrl: './aptittude.component.html',
  styleUrls: ['./aptittude.component.scss']
})
export class AptittudeComponent  {

  constructor(private firestore : AngularFirestore, private toastr: ToastrService) { }

  appForm = new FormGroup({
    question : new FormControl('', Validators.maxLength(50)),
    ans1 : new FormControl('', Validators.maxLength(10)),
    ans2 : new FormControl('', Validators.maxLength(10)),
    ans3 : new FormControl('', Validators.maxLength(10)),
    ans4 : new FormControl('', Validators.maxLength(10)),
    correctAns : new FormControl('', Validators.maxLength(10)), 
    displayTime : new FormControl()
    });

    onSubmit(){
      const date = new Date();
      const appObject = {
    id: uuid(),
    title: 'aptitude',
    description: this.appForm.value,
    metadata: {
      date: date.toDateString(),
      time: date.getTime().toString()
      }
    };
       this.firestore.collection('content').doc("apptitude").collection('apptitude').add(appObject);

      this.toastr.success('Sucessfully Submitted to FireStore!!');
      this.resetForm();

      console.log(appObject);
    }

    get f(){
      return this.appForm.controls;
    }
    resetForm() {
      this.appForm.reset();
    }
}
