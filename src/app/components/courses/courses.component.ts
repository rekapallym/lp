import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Options} from '../../models/OptionsModel';
import { v4 as uuid } from 'uuid';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize} from 'rxjs/operators';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private firestore: AngularFirestore, 
    private toastr: ToastrService, 
    private storage: AngularFireStorage,) { }
  
  // levels: Options[] = [{id: 1, value:'one'},{id:2, value:'two'},{id:3, value:'three'},
  // {id:4, value:'four'},{id:5, value:'five'},{id:6, value:'six'},{id:7, value:'seven'},
  // {id:8, value:'eight'},{id:9, value:'nine'},{id:10, value:'ten'}];

//todo chnage detection for the loop
  seletedImage = null;
  courseForm = new FormGroup({
    category: new FormControl(),
    topicName: new FormControl(),
    subTopicName: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    discountPercentage: new FormControl('%'),
    title: new FormControl(),
    difficulty_level: new FormControl(),
    imageUrl : new FormControl()
  });
  
  date = new Date();

  ngOnInit(): void {
  }

  courseSubmit(formValue){

    if(this.seletedImage != null){
      let filePath =  `courseImages/${this.seletedImage.name}_${this.date.getTime()}`;
      const fileRef = this.storage.ref(filePath);
  
      this.storage.upload(filePath, this.seletedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.firestore.collection('content').doc("course").collection('course').add(coursesObject);
          });
        })
      ).subscribe();
      const coursesObject = {
        id: uuid(),
        title: 'courses',
        description: this.courseForm.value,
        metadata: {
          date: this.date.toDateString(),
          time: this.date.getTime().toString(),
        },
      };
      console.log(coursesObject);
  
    }else{
      const coursesObject = {
        id: uuid(),
        title: 'courses',
        description: this.courseForm.value,
        metadata: {
          date: this.date.toDateString(),
          time: this.date.getTime().toString(),
        },
      };
  }
}

  get f(){
    return this.courseForm.controls; 
  }

  onFileSelected(event) {
    this.seletedImage = event.target.files[0];
  }

  esetForm() {
    this.courseForm.reset();
  }

}
