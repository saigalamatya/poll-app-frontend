import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from '../../services/poll.service';
import { PollModel } from '../../models/poll-model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router, private pollService: PollService) { }

  display: boolean = true;
  polls: PollModel[] = [];
  pollId: any;

  createPoll() {
    this.router.navigateByUrl('/create-poll');
  }

  getPollById(id) {
    // console.log("Inside get poll by Id");
    this.display = false;
    this.pollId = id;
    console.log(this.pollId);
    this.router.navigate(['index','poll', id]);
    
  }

  receiveFlag($event) {
    this.display = $event;
    console.log("Display event", this.display);
    
  }

  ngOnInit() {
    console.log("Poll List", this.polls);   

    this.pollService.getPolls()
      .subscribe(
        (poll: PollModel[]) => {
          this.polls = poll;
          console.log("Poll List", this.polls);
        }
      )
  }

}
