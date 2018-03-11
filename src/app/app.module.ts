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
import { SignInService } from './component/sign-in/sign-in.service';
import { PollListComponent } from './component/poll-list/poll-list.component';
import { IndexChildComponent } from './component/index/index-child/index-child.component';
import { SignInComponent } from './component/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    CreatePollComponent,
    PollListComponent,
    IndexChildComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [PollService, SignInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
