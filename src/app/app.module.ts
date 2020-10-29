import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToughtOfDayComponent } from './components/tought-of-day/tought-of-day.component';
import { PollComponent } from './components/poll/poll.component';
import { FunFactComponent } from './components/fun-fact/fun-fact.component';
import { HomeComponent } from './components/home/home.component';
import { WordOfDayComponent } from './components/word-of-day/word-of-day.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AptittudeComponent } from './components/aptittude/aptittude.component';
import { FeedComponent } from './components/feed/feed.component';
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ComicsComponent } from './components/comics/comics.component';
import { CoursesComponent } from './components/courses/courses.component';






@NgModule({
  declarations: [
    AppComponent,
    ToughtOfDayComponent,
    PollComponent,
    FunFactComponent,
    HomeComponent,
    WordOfDayComponent,
    AnnouncementsComponent,
    AptittudeComponent,
    FeedComponent,
    ComicsComponent,
    CoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireStorageModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
