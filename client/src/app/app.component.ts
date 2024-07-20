import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'DatingApp powered by The Dark Army';
  users: any;
  constructor(private http: HttpClient, private accountService: AccountService ){}

  ngOnInit(){
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user : User = JSON.parse(localStorage.getItem("user"));
    this.accountService.setCurrentUser(user);
  }
}
