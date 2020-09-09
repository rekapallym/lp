import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageserviceService } from 'src/app/shared/imageservice.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-word-of-day',
  templateUrl: './word-of-day.component.html',
  styleUrls: ['./word-of-day.component.scss']
})
export class WordOfDayComponent  {


  constructor( private firestore: AngularFirestore, 
               private toastr: ToastrService, 
               private storage: AngularFireStorage,
               private service: ImageserviceService) { }

  seletedImage = null;
  selectedImage1 = null;
  date = new Date();
  url1 = null;
  url2 = null;

  wordForm = new FormGroup({
    word : new FormControl('', Validators.maxLength(500)),
    wordExplain : new FormControl('', Validators.maxLength(500)),
    imageUrlFront : new FormControl(),
    imageUrlBack : new FormControl()
  })

  get f(){
    return this.wordForm.controls; 
  }
  ngOnInit() {
    
  }


  onFileSelected(event) {
    this.seletedImage = event.target.files[0];
    if(this.seletedImage != null){
      let filePath =  `wodImages/${this.seletedImage.name}_${this.date.getTime()}`;
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
      let filePath =  `wodImages/${this.selectedImage1.name}_${this.date.getTime()}`;
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

  onSubmit(formValue){

    if(this.seletedImage != null || this.selectedImage1 != null){
  
      const wordObject = {
        id: uuid(),
        title: 'word_of_the_day',
        description: this.wordForm.value,
        metadata: {
          date: this.date.toString(),
          time: this.date.getTime().toString(),
        },
      };
      formValue['imageUrlFront'] = this.url1;
      formValue['imageUrlBack'] = this.url2;

      if(this.url1 != null && this.url2 != null){
        this.firestore.collection('content').doc("wod").collection('wod').add(wordObject);
      }

      console.log(wordObject);
    } else{
      const wordObject = {
        id: uuid(),
        title: 'word_of_the_day',
        description: this.wordForm.value,
        metadata: {
          date: this.date.toString(),
          time: this.date.getTime().toString(),
        },
      };

    this.firestore.collection('content').doc("wod").collection('wod').add(wordObject);
      console.log(wordObject);
    }
   
    this.toastr.success('Sucessfully Submitted to FireStore!!');
    this.resetForm();
  }


  resetForm() {
    this.wordForm.reset();
  }

}
