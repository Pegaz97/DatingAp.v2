import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

BaseUrl = "https://localhost:5001/api/";

private currentUserSource = new ReplaySubject<User>(1);

currentUserSource$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient) { }

  login(model: any){
   
   return this.http.post(this.BaseUrl + "account/login", model).pipe(
    map((response: User) => {
      const user = response;

      if(user){
        localStorage.setItem("user", JSON.stringify(user));
        this.currentUserSource.next(user);
      }
      
    })
   );
  }

  register(model:any){
   return  this.http.post(this.BaseUrl + "account/register", model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem("user", JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }

}
