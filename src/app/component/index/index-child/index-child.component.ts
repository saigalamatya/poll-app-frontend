import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PollService } from '../../../services/poll.service';
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

  @Output() displayFlag: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private pollService: PollService) { }

  selectOption(option: any) {
    console.log("Selected option", option);
  }

  index() {
    console.log("Index Page");
    this.displayFlag.emit(this.flag);    
    // this.display = true;
    this.router.navigateByUrl('/index');
  }


  ngOnInit() {
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
