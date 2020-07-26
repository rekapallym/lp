import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuid } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit  {

  seletedFile = null;

  constructor( private firestore: AngularFirestore, private toastr: ToastrService, private storage: AngularFireStorage) { }
  
  seletedImage = null;
  date = new Date();
  announceObject = {}

  announceForm = new FormGroup({
    announcement : new FormControl('', Validators.maxLength(50)),
    imageUrl : new FormControl()
  });
  ngOnInit() {
    this.resetForm();
  }
  

  onFileSelected(event) {
    this.seletedImage = event.target.files[0];
  }

    onSubmit(formValue){
      if(this.seletedImage != null){
        let filePath =  `announcementImages/${this.seletedImage.name}_${this.date.getTime()}`;
        const fileRef = this.storage.ref(filePath);
    
        this.storage.upload(filePath, this.seletedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue.imageUrl = url;
              this.resetForm();
            });
          })
        ).subscribe();

        this.announceObject = {
          title: 'announcement',
          id: uuid(),
          description: this.announceForm.value,
          metadata: {
            date: this.date.toDateString(),
            time: this.date.getTime().toString()
            }
          };
          this.firestore.collection('content').add(this.announceObject);

      } else{
        this.announceObject = {
          title: 'announcement',
          id: uuid(),
          description: this.announceForm.value,
          metadata: {
            date: this.date.toDateString(),
            time: this.date.getTime().toString()
            }
          };
          this.firestore.collection('content').add(this.announceObject);

      }
      this.toastr.success('Sucessfully Submitted to FireStore!!');

      console.log(this.announceObject);
    }

    get f(){
      return this.announceForm.controls;
    }

    resetForm() {
      this.announceForm.reset();
    }
}
