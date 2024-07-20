import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { response } from 'express';
import { error } from 'console';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent {
  model: any = {}
  //currentUser$ : Observable<User>;

  constructor(public accountService: AccountService){}

  ngOnInit(): void {
    //this.currentUser$ = this.accountService.currentUserSource$;
  }

  login(){
    this.accountService.login(this.model).subscribe( response =>{
      console.log(response);
    }, error => {
      console.log(error);
    })
   }

   LogOut(){
    this.accountService.logout();
   }

}
