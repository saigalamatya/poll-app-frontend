import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PollModel } from '../../models/poll-model';
import { PollService } from '../../services/poll.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  constructor(private router: Router, private pollService: PollService) { }

  form: FormGroup;
  count = [1, 2];
  countOption = 2;

  createPoll() {

    let options = [];

    console.log("Create component form:", this.form);

    console.log(this.count);

    for(let i = 0; i < this.count.length; i++) {
      // console.log("Options array: ", this.form.get('option' + i).value);
      options.push(this.form.get('option' + i).value);
    }
       
    let poll = new PollModel(this.form.value.question, options, this.form.value.isAnonymous,
                            this.form.value.startDate, this.form.value.endDate);

    this.pollService.addPolls(poll)
      .subscribe(() => 
        poll => console.log("create poll", poll),
        error => console.error(error)
    );

    // this.router.navigateByUrl('/poll-list');

  }

  addOption() {
    console.log("Count option before: ", this.countOption);   
    this.countOption++;
    console.log("Count option after: ", this.countOption);
    this.count.push(this.countOption);
  }

  pollList() {
    this.router.navigateByUrl('/poll-list');
  }

  ngOnInit() {
    this.form = new FormGroup({
      question: new FormControl(null, Validators.required),
      option0: new FormControl(null, Validators.required),
      option1: new FormControl(null, Validators.required),
      option2: new FormControl(null),
      option3: new FormControl(null),
      option4: new FormControl(null),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      isAnonymous: new FormControl(null, Validators.required)
    })
  }

}
