import { MatSnackBar } from '@angular/material/snack-bar';
import { VideosService } from './../services/videos.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  username = localStorage.getItem('name');
  id = localStorage.getItem('token');

  totalrevenue:any;
  constructor(private videosService:VideosService, public matSnackBar:MatSnackBar,public router:Router,private authService:AuthService) { }

   startJobAt(hh: number, mm: number, code: any) {
    var interval = 0;
    var today = new Date();
    var todayHH = today.getHours();
    var todayMM = today.getMinutes();
    if ((todayHH > hh) || (todayHH == hh && todayMM > mm)) {
        var midnight = new Date();
        midnight.setHours(24,0,0,0);
        interval = midnight.getTime() - today.getTime() +
                (hh * 60 * 60 * 1000) + (mm * 60 * 1000);
    } else {
        interval = (hh - todayHH) * 60 * 60 * 1000 + (mm - todayMM) * 60 * 1000;
    }
    return setTimeout(code, interval);

   }

   tick() {
    //get the mins of the current time
    let mins = new Date().getMinutes();
    if (mins == 0) {
      alert('Do stuff');
    }
    console.log('Tick ' + mins);
  }

  ngOnInit(): void {
    this.startJobAt(14,16, this.tick)
    // setInterval(this.tick, 1000);
    var today = new Date();

    console.log(today)
    this.getTotalRevenue();
   
  }
  getTotalRevenue(){
    const id = localStorage.getItem("token");
    this.authService.getRevenue(id).subscribe(res => {
      this.totalrevenue = res.revenue
    });
  }
  withdraw(){
    if(this.totalrevenue < 5){
      this.matSnackBar.open('Minimum $5 required to Withdraw!. ', '', {duration: 2000});
    }else{
      this.router.navigate(['/withdraw-bank']);
    }
  }

}
