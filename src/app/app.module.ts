import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { routing } from './routes/app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { IndexComponent } from './component/index/index.component';
import { CreatePollComponent } from './component/create-poll/create-poll.component';

import { PollService } from './services/poll.service';
import { PollListComponent } from './component/poll-list/poll-list.component';
import { IndexChildComponent } from './component/index/index-child/index-child.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    CreatePollComponent,
    PollListComponent,
    IndexChildComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
