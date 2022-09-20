import { NotificationServiceService } from './services/notification-service.service';
import { PaymentsService } from './services/payments.service';
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
  notificationCount:any;
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
  isAdmin: any;
  constructor(public router:Router,private sidebarService: NbSidebarService, private authService:AuthService,private nbMenuService: NbMenuService, private notiService:NotificationServiceService,private paymentService:PaymentsService,) {
  }
  ToggleSideBar(){
    this.sidebarService.toggle(false, 'left');
  }
  ngOnInit(){

    if(localStorage.getItem('admid')){
      this.isAdmin = true;
    }else{
      this.isAdmin = false
    }
    localStorage.removeItem('id');
    this.isLogin = this.authService.loggedIn();
    this.notiService.GetPaymentStatus()
    this.getNotifications();
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

  getNotifications():void{
    this.paymentService.getNotifications(localStorage.getItem('token')).subscribe((res) => {
      this.notificationCount = res.data.filter((obj:any) => obj.read === "No").length
    })
  }
  tohome(){
    if(this.isAdmin){
      this.router.navigate(['/Admin']);
    }else{
      this.router.navigate(['/home']);
    }
  }
  loggedOut(){
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }
}
