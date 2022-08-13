import { VideosService } from './../services/videos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  

  selectedItemFormControl = new FormControl('', Validators.required);
  constructor(private videoService:VideosService,private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }
  sendReport(){
    let data = {
      videoId : localStorage.getItem("vidId"),
      VideoUserId : localStorage.getItem("VusrId"),
      UserId :localStorage.getItem("token"),
      Reportedas :this.selectedItemFormControl.value
    }

    this.videoService.sendReport(data).subscribe(res => {
        if(res.status == true){
          this.showToast('Report Sent Successfully Sent.', 'success');
        }else{
          this.showToast('Sending Report Faild', 'danger')
        }
    });
  }

  showToast(value:any,status: NbComponentStatus) {
    this.toastrService.show(status, `${value} `, { status });
  }
}
