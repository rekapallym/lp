import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Options} from '../../models/OptionsModel';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor() { }
  
  levels: Options[] = [{id: 1, value:'one'},{id:2, value:'two'},{id:3, value:'three'},
  {id:4, value:'four'},{id:5, value:'five'},{id:6, value:'six'},{id:7, value:'seven'},
  {id:8, value:'eight'},{id:9, value:'nine'},{id:10, value:'ten'}];

//todo chnage detection for the loop

  courseForm = new FormGroup({
    category: new FormControl(),
    topicName: new FormControl(),
    subTopicName: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    discountPercentage: new FormControl('%'),
    title: new FormControl(),
    difficulty_level: new FormControl()
  })

  ngOnInit(): void {
  }

  courseSubmit(){
    console.log(this.courseForm.value);
  }

  get f(){
    return this.courseForm.controls; 
  }

  esetForm() {
    this.courseForm.reset();
  }

}
