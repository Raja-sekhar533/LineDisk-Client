import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username =localStorage.getItem('name');
  isLogin=false;
  constructor(public router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.isLogin = this.authService.loggedIn();
  }
  loggedOut(){
    localStorage.removeItem('id');
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }
}
