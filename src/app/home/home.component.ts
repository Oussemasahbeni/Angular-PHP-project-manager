import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Service/api.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isUserLoggedIn: boolean = false;


  constructor(private service: ApiService) {
    this.service.currentLoginStatus.subscribe(status => {
      this.isUserLoggedIn = status;
    });
  }
}
