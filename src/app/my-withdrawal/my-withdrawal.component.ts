import { PaymentsService } from './../services/payments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-withdrawal',
  templateUrl: './my-withdrawal.component.html',
  styleUrls: ['./my-withdrawal.component.scss']
})
export class MyWithdrawalComponent implements OnInit {

  constructor(private paymentService:PaymentsService) { }
  payments:any;
  auditing = {valid:true, reset: () =>void true };
  linearMode = true;

  ngOnInit(): void {
    this.getTransaction();
  }
  getTransaction(){
    const userId = localStorage.getItem("token");
    this.paymentService.getPaymentsById(userId).subscribe(res => {
      console.log(res.data)
      this.payments = res.data.reverse();
    })
  }
}
