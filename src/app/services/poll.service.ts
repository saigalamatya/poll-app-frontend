import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PollModel } from '../models/poll-model';
import { VoteModel } from '../models/vote-model';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PollService {

  constructor(private http: Http) { }

  polls: PollModel[] = [];

  addPolls(pollModel: PollModel) {
    console.log("Inside Poll Model", pollModel);

    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post("http://localhost:5555/api/polls", pollModel, { headers: headers })
      .map((res: Response) => {
        res.json()
      }).catch((err) => {
        throw(err.json());
        
      });
  }

  getPolls() {
    console.log("Inside Get Polls", this.polls);

    return this.http.get("http://localhost:5555/api/polls")
      .map((res: Response) => {
        console.log(res.json().obj);
        const polls = res.json().obj;
        let transformPoll: PollModel[] = [];
        for(let p of polls) {
          console.log("Inside get poll service(id)", p._id);
          let poll = new PollModel(p.poll, p.options[0].options, p.isAnonymous, p.startDate, p.endDate, p._id);
          transformPoll.push(poll);
        }        
        this.polls = transformPoll;
        return transformPoll;
      })
      .catch((err: Response) => Observable.throw(err.json()));
  }

  getPollById(pollId: any) {
    console.log("Inside get poll by Id", pollId);

    return this.http.get("http://localhost:5555/api/polls/" + pollId)
      .map((res: Response) => res.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  insertVote(voteModel: VoteModel) {
    console.log("Inside insert vote", voteModel);
    
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post("http://localhost:5555/api/votes", voteModel, { headers: headers })
      .map((res: Response) => res.json()      
      )
      .catch((err) => {
        throw(err.json());
      });
  }

  countVote(pollId) {
    console.log("Inside count vote", pollId);
    
    return this.http.get("http://localhost:5555/api/votes/count/" + pollId)
      .map((res: Response) => res.json())
      .catch((err) => {
        throw(err.json());
      });
  }

}
