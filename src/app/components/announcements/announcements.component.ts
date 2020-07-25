import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedserviceService } from 'src/app/shared/feedservice.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuid } from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent  {

  seletedFile = null;

  constructor( private firestore : AngularFirestore,private toastr: ToastrService) { }
  
  announceForm = new FormGroup({
    announcement : new FormControl('Enter new Announcements', Validators.maxLength(50))
  });
  

  onFileSelected(event) {
    this.seletedFile = event.target.files[0];
  }

    onSubmit(){
      const date = new Date();
      const announceObject = {
    title: 'announcement',
    id: uuid(),
    description: this.announceForm.value,
    metadata: {
      date: date.toDateString(),
      time: date.getTime().toString()
      }
    };
      this.firestore.collection('content').add(announceObject);
      this.toastr.success('Sucessfully Submitted to FireStore!!');

      console.log(announceObject);
    }

    get f(){
      return this.announceForm.controls;
    }
}
