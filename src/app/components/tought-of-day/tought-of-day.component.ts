import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tought-of-day',
  templateUrl: './tought-of-day.component.html',
  styleUrls: ['./tought-of-day.component.scss']
})
export class ToughtOfDayComponent {

  property = ''
  seletedFile = null;


  onFileSelected(event) {
    this.seletedFile = event.target.files[0];
  }

  handleClick(){
    console.log(this.property);
    console.log(this.seletedFile);
  }

}
