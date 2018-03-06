import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PollService } from '../../../services/poll.service';
import { VoteModel } from '../../../models/vote-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-child',
  templateUrl: './index-child.component.html',
  styleUrls: ['./index-child.component.css']
})
export class IndexChildComponent implements OnInit, OnChanges {

  @Input() pollId: any;
  options: Array<any>;
  poll: any;
  flag: boolean = true;
  voteCount: number = 0;

  voteOption: String;

  @Output() displayFlag: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private pollService: PollService) { }

  selectOption(option: any) {
    console.log("Selected option", option);
    this.voteOption = option;
  }

  index() {
    console.log("Index Page");
    this.displayFlag.emit(this.flag);
    // this.display = true;
    this.router.navigateByUrl('/index');
  }

  castVote(votePollId) {

    this.voteCount++;
    // this.votePollId = votePollId;
    // this.voteOption = voteOption;
    // console.log(this.votePollId);
    console.log(this.voteOption, votePollId);

    let vote = new VoteModel(votePollId, this.voteOption);

    this.pollService.insertVote(vote)
      .subscribe(
        vote => {
          console.log("Votes", vote);
          this.voteOption = vote.obj.option
          console.log("You voted for ", this.voteOption);
        },
        err => {
          console.log("Error inserting vote!!!");
        }

      );

      this.pollService.countVote(this.pollId)
        .subscribe(
            id => { 
              console.log("Total votes casted for the poll is: ", id.result);
            }
        );

  }


  ngOnInit() {

    this.pollService.countVote(this.pollId)
    .subscribe(
        id => { 
          // console.log("Total votes casted for the poll is: ", id.result);
          this.voteCount = id.result;
        }
    );

    this.pollService.getPollById(this.pollId)
      .subscribe(
        // data => console.log(data.obj[0]._id, "get poll by id")
        poll => {
          console.log("Get poll by id", poll.obj[0].options)
          this.options = poll.obj[0].options[0].options;
          this.poll = poll.obj[0].poll;
          console.log("Polls:", this.poll);
          console.log("Options", this.options);
        }
      );

  }

  ngOnChanges() {

  }

}
