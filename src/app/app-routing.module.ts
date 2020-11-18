import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ToughtOfDayComponent} from './components/tought-of-day/tought-of-day.component';
import { AppComponent } from './app.component';
import { PollComponent } from './components/poll/poll.component';
import { FunFactComponent } from './components/fun-fact/fun-fact.component';
import { HomeComponent } from './components/home/home.component';
import { AptittudeComponent } from './components/aptittude/aptittude.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { WordOfDayComponent } from './components/word-of-day/word-of-day.component';
import { FeedComponent } from './components/feed/feed.component';
import { ComicsComponent } from './components/comics/comics.component';
import { CoursesComponent } from './components/courses/courses.component';



const routes: Routes = [{
  path: 'tod' ,
  component: ToughtOfDayComponent,
},{
  path: 'poll' ,
  component: PollComponent,
},{
  path: 'funfact' ,
  component: FunFactComponent,
},
{
  path: '' ,
  component: HomeComponent,
},{
  path: 'aptitude' ,
  component: AptittudeComponent,
},{
  path: 'announce' ,
  component: AnnouncementsComponent,
},{
  path: 'word' ,
  component: WordOfDayComponent,
},{
  path: 'feed' ,
  component: FeedComponent,
},{
  path: 'comics' ,
  component: ComicsComponent,
},{
  path: 'courses' ,
  component: CoursesComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
