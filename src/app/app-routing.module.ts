import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ToughtOfDayComponent} from './components/tought-of-day/tought-of-day.component';
import { AppComponent } from './app.component';
import { PollComponent } from './components/poll/poll.component';
import { FunFactComponent } from './components/fun-fact/fun-fact.component';



const routes: Routes = [{
  path: 'tod' ,
  component: ToughtOfDayComponent,
},{
  path: 'poll' ,
  component: PollComponent,
},{
  path: 'funfact' ,
  component: FunFactComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
