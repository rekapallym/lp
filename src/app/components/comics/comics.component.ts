import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  constructor( private firestore: AngularFirestore, 
    private toastr: ToastrService, 
    private storage: AngularFireStorage,
    ) { }

    seletedImage = null;
    date = new Date();

  ngOnInit(): void {
  }

  comicsForm = new FormGroup({
    field : new FormControl(),
    genre : new FormControl(),
    comicName : new FormControl(),
    overview : new FormControl(),
    category : new FormControl(),
    imageContentUrl : new FormControl()
  });


  onFileSelected(event){
    this.seletedImage = event.target.files[0];
  }
  onSubmit(formValue){
    if(this.seletedImage != null){
      let filePath =  `comicsImages/${this.seletedImage.name}_${this.date.getTime()}`;
      const fileRef = this.storage.ref(filePath);
  
      this.storage.upload(filePath, this.seletedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageContentUrl'] = url;
            this.firestore.collection('content').doc("comics").collection('comics').add(comicsObject);
          });
        })
      ).subscribe();
      const comicsObject = {
        id: uuid(),
        title: 'comics',
        description: this.comicsForm.value,
        metadata: {
          date: this.date.toDateString(),
          time: this.date.getTime().toString(),
        },
      };
      console.log(comicsObject);
  
    } else {
      const comicsObject = {
        id: uuid(),
        title: 'comics',
        description: this.comicsForm.value,
        metadata: {
          date: this.date.toDateString(),
          time: this.date.getTime().toString(),
        },
      };
      this.firestore.collection('content').doc("comics").collection('comics').add(comicsObject);
  
      console.log(comicsObject);
    }

  }

  resetForm() {
    this.comicsForm.reset();
  }
}

