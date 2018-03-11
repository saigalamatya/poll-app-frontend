import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user-model';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SignInService {

  constructor(private http: Http) { }

  users: UserModel[] = [];
  queryString = 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNhaWdhbCIsImlhdCI6MTUyMDc3NTY0OSwiZXhwIjoxNTIwOTQ4NDQ5fQ.D4uJHJgsVwQ98Q1ZVTEx-bG4axzNM3ZGoc1tThXO5AU';

  authUser(user: UserModel) {
    console.log("Sign in Service", user);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`http://localhost:5555/api/users?${this.queryString}`, user, {headers: headers})
      .map((res: Response) =>  console.log("Asda", res.json()))
      .catch((err: Response) => Observable.throw(err.json()));
  }

  getUsers() {

    console.log("Inside getUsers");

    return this.http.get("http://localhost:5555/api/users?" + this.queryString)
      .map((res: Response) => {
        console.log(res.json().obj);
        let users = res.json().obj;
        // const usersArray = Object.values(users);
        // console.log(usersArray);
        console.log("Users Array", users);
        let tempUserModel: UserModel[] = [];
        for (let u of users) {
          console.log("Inside get users service", u.userName);
          let user = new UserModel(u.userName, u.password);
          tempUserModel.push(user);
        }
        this.users = tempUserModel;
        console.log("t", tempUserModel);
        return tempUserModel;
      })
      .catch((err: Response) => Observable.throw(err.json()));
  }

  // getUsersById(id: any) {
  //   console.log("Inside get users by _id");

  //   return this.http.get("http://localhost:5555/api/users?" + this.queryString)
  //     .map((res: Response) => {
  //       let userId = res.json().obj;
  //     })
  //     .catch((err: Response) => Observable.throw(err.json()));
  // }

}
