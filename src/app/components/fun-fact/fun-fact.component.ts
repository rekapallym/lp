import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-fun-fact',
  templateUrl: './fun-fact.component.html',
  styleUrls: ['./fun-fact.component.scss']
})
export class FunFactComponent implements OnInit {

  constructor(private firestore : AngularFirestore, private toastr: ToastrService) { }


  funFactForm = new FormGroup({
    question : new FormControl('', Validators.maxLength(50)),
    ans: new FormControl('', Validators.maxLength(50))
  })

  funFactSubmit(){
    const date = new Date();
    const funFactObject = {
    id: uuid(),
    title: 'funfact',
    description: this.funFactForm.value,
    metadata: {
      date: date.toDateString(),
      time: date.getTime().toString()
      }
    };

     this.firestore.collection('content').doc("funfact").collection('funfact').add(funFactObject);

    this.toastr.success('Sucessfully Submitted to FireStore!!');
    this.resetForm();
    console.log(funFactObject);

  }

  get f(){
    return this.funFactForm.controls;
  }

  ngOnInit(): void {
  }
  resetForm() {
      this.funFactForm.reset();
    }

}
