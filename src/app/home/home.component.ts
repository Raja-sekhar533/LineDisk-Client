import { Component, OnInit } from '@angular/core';
import { NotificationServiceService } from '../services/notification-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private notiService:NotificationServiceService) { }

  ngOnInit(): void {
    console.log("calling from Home page")
    this.notiService.GetPaymentStatus().subscribe(res => {
      this.notiService.showToast(res.data.message,'success');
    })

  }

}
