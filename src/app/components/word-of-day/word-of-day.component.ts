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
  date = new Date();

  wordForm = new FormGroup({
    word : new FormControl('', Validators.maxLength(50)),
    wordExplain : new FormControl('', Validators.maxLength(50)),
    imageUrl : new FormControl()
  })

  get f(){
    return this.wordForm.controls; 
  }
  ngOnInit() {
    this.resetForm();
  }


  onFileSelected(event) {
    this.seletedImage = event.target.files[0];
  }
  onSubmit(formValue){

    if(this.seletedImage != null){
      let filePath =  `wodImages/${this.seletedImage.name}_${this.date.getTime()}`;
      const fileRef = this.storage.ref(filePath);
  
      this.storage.upload(filePath, this.seletedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.firestore.collection('content').doc("wod").collection('wod').add(wordObject);
            this.resetForm();
          });
        })
      ).subscribe();
      const wordObject = {
        id: uuid(),
        title: 'word_of_the_day',
        description: this.wordForm.value,
        metadata: {
          date: this.date.toString(),
          time: this.date.getTime().toString(),
        },
      };
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
