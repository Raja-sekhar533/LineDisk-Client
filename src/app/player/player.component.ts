import { ReportDialogComponent } from './../report-dialog/report-dialog.component';
import { VideosService } from './../services/videos.service';
import { Component, OnInit, Optional, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  videoDetails:any;
  playerUrl:any;
  title:any;
  fileSize:any;
  VideoUser:any;
  date:any;
  isSaved =false;
  ipAddress:any;

  constructor(private route: ActivatedRoute,private videoService: VideosService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getClientIp();
    this.issaved();
    this.getVideoBy();
  }
addView(){
 
  const data = {
     videoId : this.route.snapshot.paramMap.get('id'),
     userId :localStorage.getItem('token'),
     date: new Date(),
     IpAddress:this.ipAddress
  }
  this.videoService.addViewCount(data).subscribe(res => {
    
  }) 
}
getVideoBy(){
  this.videoService.getVideoDetails(this.route.snapshot.paramMap.get('id')).subscribe(res =>{
    this.videoDetails = res.data;
  })
}

savetoMydisk(){
  let data = {
    playerUrl : localStorage.getItem("url"),
    title : localStorage.getItem("title"),
    fileSize : localStorage.getItem("size"),
    fileDescription: localStorage.getItem("Description")
  }
  const id = localStorage.getItem("token");
  this.videoService.saveToMyDisk(data,id).subscribe(res => {if(res.status == true){
    this.isSaved = true
  }});
}

issaved(){
  if(localStorage.getItem("token")){

    let data={
      userId:localStorage.getItem("token"),
      videoId: localStorage.getItem("vidId")
    }
    this.videoService.isVideoSaved(data).subscribe(res => {
      if(res.status == true){
        this.isSaved = true
      }
    })
  }
}
open() {
  this.dialog.open(ReportDialogComponent);
}
getClientIp(){
   this.videoService.getClientIp().subscribe((res:any)=>{
     this.ipAddress= res.ip;
     this.addView();
  });
}
}
