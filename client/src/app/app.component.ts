import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'DatingApp powered by The Dark Army';
  users: any;
  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getUsers();
  }
  getUsers(){
    this.http.get("https://localhost:5001/api/users").subscribe(response =>{
      this.users = response;
    }, error => {
      console.log(error);
    });
  }
}
