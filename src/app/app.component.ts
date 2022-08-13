import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LineDiskClient';
  userMenu = [{ title: 'Log out' , link:"/login"} ];
  userMenu2 = [{ title: 'Sign In' , link:"/login"}, {title:"Sign Up", link:"/signup"} ];
  token = this.authService.loggedIn();
  user :any;
  items: NbMenuItem[] = [
    {
      title: 'My Videos',
      icon: 'video-outline',
      link:'/myvideos'
    },
    {
      title: 'Upload',
      icon:'cloud-upload-outline',
      link:'/upload'
    },
    {
      title: 'Income',
      icon:'credit-card-outline',
      link:'/income'
    },

  ]
  isLogin = false;
  
  constructor(public router:Router,private sidebarService: NbSidebarService, private authService:AuthService,private nbMenuService: NbMenuService) {
  }
  ToggleSideBar(){
    this.sidebarService.toggle(false, 'left');
  }
  OnInit(){
    localStorage.removeItem('id');
    this.isLogin = this.authService.loggedIn();
    this.nbMenuService.onItemClick()
    .pipe(
      filter(({ tag }) => tag === 'my-context-menu'),
      map(({ item: { title } }) => title),
    )
    .subscribe((title: string) => {
      console.log(title)
      if(title == "Sign In"){
        this.router.navigate(['/login']);
      }else if(title == "Sign Up"){
        this.router.navigate(['/signup']);
      }else{
        this.loggedOut()
      }
    });
  }

  loggedOut(){
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }
}
