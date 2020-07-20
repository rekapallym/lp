import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToughtOfDayComponent } from './components/tought-of-day/tought-of-day.component';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FileUploadModule} from 'primeng/fileupload';
import { PollComponent } from './components/poll/poll.component';
import { FunFactComponent } from './components/fun-fact/fun-fact.component';
import { HomeComponent } from './components/home/home.component';
import { WordOfDayComponent } from './components/word-of-day/word-of-day.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AptittudeComponent } from './components/aptittude/aptittude.component';
import { FeedComponent } from './components/feed/feed.component';



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
    FeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    CardModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
