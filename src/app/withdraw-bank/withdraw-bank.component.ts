import { AuthService } from './../services/auth.service';
import { PaymentsService } from './../services/payments.service';
import { VideosService } from './../services/videos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-withdraw-bank',
  templateUrl: './withdraw-bank.component.html',
  styleUrls: ['./withdraw-bank.component.scss']
})
export class WithdrawBankComponent implements OnInit {
  videosService: any;
  totalrevenue:any;
  isMax!: boolean;
  PType:any;
  constructor(private authService:AuthService, private paymentsService:PaymentsService) { }

  ngOnInit(): void {
    this.getTotalRevenue();
  }
  getTotalRevenue(){
    const id = localStorage.getItem("token");
    this.authService.getRevenue(id).subscribe(res => {
      this.totalrevenue = res.revenue
    });
  }

  withDrawForm = new FormGroup({
    mobileUpi: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.nullValidator, Validators.min(5)])
  });

  onSubmit(){
    const userId = localStorage.getItem("token");
    const today = Date();
    const data ={
       data : this.withDrawForm.value,
       PaymentType:this.PType,
       date:today
    }
    this.paymentsService.sendPaymentReq(userId,data).subscribe(res => {
      console.log(res)
    });
  }
  
  onFocus($e:any){
    if($e.target.value > this.totalrevenue){
      this.isMax = true;
    }
    console.log(this.isMax)
  }
  paymentTypePTM(){
    this.PType = "PTMPAY"  
  }
  
  paymentPHpay(){
    this.PType = "PHPAY"  
  }

  paymentGpay(){
    this.PType = "GPAY"  
  }

}
