import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../services/payments.service';

@Component({
  providers:[AppComponent],
  selector: 'app-notificationsui',
  templateUrl: './notificationsui.component.html',
  styleUrls: ['./notificationsui.component.scss']
})
export class NotificationsuiComponent implements OnInit {
  notifications:any;
  constructor(private paymentService:PaymentsService, private app:AppComponent) { }

  ngOnInit(): void {
    this.getNotifications();

  }

  getNotifications(){
    return this.paymentService.getNotifications(localStorage.getItem('token')).subscribe((res) => {
      this.notifications = res.data.reverse();
    })
  }

  UpdateStatus(id:any):void{
    this.paymentService.updateNotifications(id).subscribe(res =>{
      this.getNotifications();
      this.app.getNotifications();
    })
  }
}
