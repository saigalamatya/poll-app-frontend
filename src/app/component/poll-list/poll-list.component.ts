import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from '../../services/poll.service';
import { PollModel } from '../../models/poll-model';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {

  polls: PollModel[] = [];

  constructor(private router: Router, private pollService: PollService) { }

  createPoll() {
    this.router.navigateByUrl('/create-poll');
  }

  ngOnInit() {
    this.pollService.getPolls()
      .subscribe(
        // x => {
        //   console.log(x)
        // },
        // err => {
        //   console.log(err)
        // }
        (poll: PollModel[]) => {
          this.polls = poll;
          console.log("poll list", this.polls);
        }
      );
  }

}
