import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuid } from 'uuid';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-fun-fact',
  templateUrl: './fun-fact.component.html',
  styleUrls: ['./fun-fact.component.scss']
})
export class FunFactComponent implements OnInit {

  seletedImage = null;
  selectedImage1 = null;
  date = new Date();
  url1 = null;
  url2 = null;

  constructor(private firestore : AngularFirestore, private toastr: ToastrService, private storage: AngularFireStorage) { }


  funFactForm = new FormGroup({
    question : new FormControl('', Validators.maxLength(500)),
    ans: new FormControl('', Validators.maxLength(500)),
    imageUrlFront : new FormControl(),
    imageUrlBack : new FormControl()
  })

  onFileSelected(event) {
    this.seletedImage = event.target.files[0];
    if(this.seletedImage != null){
      let filePath =  `funFactImages/${this.seletedImage.name}_${this.date.getTime()}`;
      const fileRef = this.storage.ref(filePath);
  
      this.storage.upload(filePath, this.seletedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.url1 = url;
          });
        })
      ).subscribe();

    }
  }

  onFileSelected1(event){
    this.selectedImage1 = event.target.files[0];
    if(this.selectedImage1 != null){
      let filePath =  `funFactImages/${this.selectedImage1.name}_${this.date.getTime()}`;
      const fileRef = this.storage.ref(filePath);
  
      this.storage.upload(filePath, this.selectedImage1).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.url2 = url;
          });
        })
      ).subscribe();

    }

  }

  funFactSubmit(formValue){

    if(this.seletedImage != null || this.selectedImage1 != null){
  
      const funObject = {
        id: uuid(),
        title: 'funfact',
        description: this.funFactForm.value,
        metadata: {
          date: this.date.toString(),
          time: this.date.getTime().toString(),
        },
      };

      if(this.url1 != null || this.url2 != null){
        formValue['imageUrlFront'] = this.url1;
        formValue['imageUrlBack'] = this.url2;
        this.firestore.collection('content').doc('funFact').collection('funFact').add(funObject);
      }

      console.log(funObject);
    } else{
      const funObject = {
        id: uuid(),
        title: 'funfact',
        description: this.funFactForm.value,
        metadata: {
          date: this.date.toString(),
          time: this.date.getTime().toString(),
        },
      };

    this.firestore.collection('content').doc('funFact').collection('funFact').add(funObject);
      console.log(funObject);
    }

    this.toastr.success('Sucessfully Submitted to FireStore!!');
    this.resetForm();

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
