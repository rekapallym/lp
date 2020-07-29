import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor( private firestore: AngularFirestore, 
    private toastr: ToastrService, 
    private storage: AngularFireStorage,
    ) { }


    seletedImage = null;
    date = new Date();
  
    feedForm = new FormGroup({
      content : new FormControl('', Validators.maxLength(50)),
      category: new FormControl(''),
      imageUrl : new FormControl(),
      title : new FormControl()
    });


    ngOnInit() {
      this.resetForm();
    }
  
    get f(){
      return this.feedForm.controls;
    }
  
    onFileSelected(event) {
      this.seletedImage = event.target.files[0];
    }

    onSubmit(formValue){

      if(this.seletedImage != null){
      let filePath =  `feedImages/${this.seletedImage.name}_${this.date.getTime()}`;
      const fileRef = this.storage.ref(filePath);
  
      this.storage.upload(filePath, this.seletedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.resetForm();
          });
        })
      ).subscribe();
      const feedObject = {
        id: uuid(),
        title: 'feed',
        description: this.feedForm.value,
        metadata: {
          date: this.date.toDateString(),
          time: this.date.getTime().toString(),
        },
      };
      this.firestore.collection('content').add(feedObject);
      console.log(feedObject);

    }else {
      const feedObject = {
        id: uuid(),
        title: 'feed',
        description: this.feedForm.value,
        metadata: {
          date: this.date.toDateString(),
          time: this.date.getTime().toString(),
        },
      };
      this.firestore.collection('content').add(feedObject);
      console.log(feedObject);

    }

      this.toastr.success('Sucessfully Submitted to FireStore!!');    
    }
  
    resetForm() {
      this.feedForm.reset();
    }
  

}
