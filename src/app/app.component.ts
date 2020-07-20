import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lp';

  constructor(
    private route: Router,
  ) {}

  routeTod(){
    this.route.navigate(['tod'],{});
  }

  routeToPoll(){
    this.route.navigate(['poll'],{});
  }

  routeToFunFact(){
    this.route.navigate(['funfact'],{});
  }

  home(){
    this.route.navigate([''],{});
  }

  word(){
    this.route.navigate(['word'],{});
  }
  feed(){
    this.route.navigate(['feed'],{});
  }
  apptitude(){
    this.route.navigate(['aptitude'],{});
  }
  announce(){
    this.route.navigate(['announce'],{});
  }

}
