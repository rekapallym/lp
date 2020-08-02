import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize} from 'rxjs/operators';
import { ImageserviceService } from 'src/app/shared/imageservice.service';



@Component({
  selector: 'app-tought-of-day',
  templateUrl: './tought-of-day.component.html',
  styleUrls: ['./tought-of-day.component.scss']
})
export class ToughtOfDayComponent implements OnInit{
  constructor( private firestore: AngularFirestore, 
               private toastr: ToastrService, 
               private storage: AngularFireStorage,
               private service: ImageserviceService) { }

  
  seletedImage = null;
  date = new Date();

  thoughtForm = new FormGroup({
    content : new FormControl('', Validators.maxLength(50)),
    imageUrl : new FormControl()
  });
  
  ngOnInit() {
    this.resetForm();
    this.service.getImageDetailList(); 
  }

  get f(){
    return this.thoughtForm.controls;
  }

  onFileSelected(event) {
    this.seletedImage = event.target.files[0];
  }
   onSubmit(formValue){

    if(this.seletedImage != null){
    let filePath =  `todImages/${this.seletedImage.name}_${this.date.getTime()}`;
    const fileRef = this.storage.ref(filePath);

    this.storage.upload(filePath, this.seletedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['imageUrl'] = url;
          this.firestore.collection('content').doc("tod").collection('tod').add(toughtObject);

          this.resetForm();
        });
      })
    ).subscribe();
    const toughtObject = {
      id: uuid(),
      title: 'thought_of_the_day',
      description: this.thoughtForm.value,
      metadata: {
        date: this.date.toDateString(),
        time: this.date.getTime().toString(),
      },
    };
    console.log(toughtObject);

  }else{
    const toughtObject = {
      id: uuid(),
      title: 'thought_of_the_day',
      description: this.thoughtForm.value,
      metadata: {
        date: this.date.toDateString(),
        time: this.date.getTime().toString(),
      },
    };
    this.firestore.collection('content').doc("tod").collection('tod').add(toughtObject);

    console.log(toughtObject);

  }
    this.toastr.success('Sucessfully Submitted to FireStore!!');

  }

  resetForm() {
    this.thoughtForm.reset();
  }
}
