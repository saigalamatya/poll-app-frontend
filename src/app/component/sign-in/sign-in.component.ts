import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from './sign-in.service';
import { UserModel } from '../../models/user-model';
import { compareSync } from 'bcrypt';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(private router: Router, private signInService: SignInService) { }

  userName: any;
  password: any;

  users: UserModel[] = [];
  // userId: any[] = [];

  ngOnInit() {

    this.signInService.getUsers()
      .subscribe(
        (user: UserModel[]) => {
          this.users = user;
          // console.log(this.userId);
          console.log("User:", user);
        }
      );

  }

  // signIn(userName, password) {
  //   // console.log("userName", this.users);
  //   this.userName = userName;
  //   console.log(userName);

  //   // this.signInService.signInService();

  //   // this.router.navigateByUrl('/index');
  // }

  signIn(userName, password) {
    userName = this.userName;
    password = this.password;

    let user = new UserModel(userName, password);
    console.log(user, "user");

    this.signInService.authUser(user)
      .subscribe(
        user => {
          console.log(user, "SDas");
          console.log("Authentication successful");
          this.router.navigateByUrl('/index');
        },
        error => {
          console.log("Error authenticating!!!");
        }
      );
    

    // this.signInService.getUsersById(id)
    // .subscribe(
    //   (userId: UserModel[]) => {
    //     this.userId = userId;
    //     console.log("user_id", userId);
    //   }
    // );
    // this.userId = id;
    // console.log(this.userId);
  }

}
