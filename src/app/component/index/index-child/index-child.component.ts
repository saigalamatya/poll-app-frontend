import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PollService } from '../../../services/poll.service';
import { VoteModel } from '../../../models/vote-model';
import { Router } from '@angular/router';

import { Chart } from 'chart.js';

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

  chart = [];
  chartArray = [];
  chartCount = [];

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

      // this.pollService.totalVoteCount(this.pollId)
      //   .subscribe(
      //       id => { 
      //         console.log("Total votes casted for the poll is: ", id.result);
      //       }
      //   );

        // this.displayChart();

  }

  // displayChart() {

    // this.pollService.getPollById(this.pollId)
    //   .subscribe(
    //     // data => console.log(data.obj[0]._id, "get poll by id")
    //     poll => {
    //       console.log("Get poll by id", poll.obj[0].options)
    //       this.options = poll.obj[0].options[0].options;
    //       this.poll = poll.obj[0].poll;
    //       console.log("Polls:", this.poll);
    //       console.log("Options", this.options);
    //     }
    //   );

  //     this.chart = new Chart('canvas', {
  //       type: 'line',
  //       data: {
  //         labels: this.chartDisplay,
  //         datasets: [
  //           {
  //             data: 
  //           }
  //         ]
  //       },
  //       options: {
  //         legend: {
  //           display: false
  //         },
  //         scales: {
  //           xAxes: [{
  //             display:true
  //           }],
  //           yAxes: [{
  //             display: true
  //           }]
  //         }
  //       }
  //     });

  // }

  ngOnInit() {

    this.pollService.totalVoteCount(this.pollId)
    .subscribe(
        id => { 
          // console.log("id", id.result);
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

    this.pollService.countVote(this.pollId)
      .subscribe(
        res => {
          let name = res['count'].map(res => res._id);
          let count = res['count'].map(res =>res.count)
          console.log("name", name);
          console.log("count", count);

          for(let n of name) {
            this.chartArray.push(n);
            // console.log("n", n);
          }

          for(let c of count) {
            this.chartCount.push(c);
            // console.log("c", c);
          }

          // console.log(this.chartCount);
          // console.log(this.chartArray);

          // this.chartArray.push(name);
          // // console.log("Chart array", this.chartArray);

          // this.chartCount.push(count);
          // // console.log("Chart count", this.chartCount);
          
          var ctx = document.getElementById("myChart");
          this.chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: this.chartArray,
              datasets: [
                {
                  data: this.chartCount,
                  borderColor: "#3cba9f",
                  fill: false
                },
                // {
                //   data: this.chartCount,
                //   borderColor: "#ffcc00",
                //   fill: false
                // }
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }],
              }
            }
          });
          console.log(this.chart);
          
        }
        // data => console.log("data", data)  
            
    );

       

  }

  ngOnChanges() {

  }

}