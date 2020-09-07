import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {

  imageDetailList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('content');
    // console.log("mani", this.firebase.list('content'))
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }
}
