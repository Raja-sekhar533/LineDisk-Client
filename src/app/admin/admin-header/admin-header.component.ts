import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  isLogin=false;
  username = "Raja Sekhar";
  constructor() { }

  ngOnInit(): void {
  }
  loggedOut(){
    localStorage.removeItem('token'); 
    // this.router.navigate(['/login']);
  }
}
