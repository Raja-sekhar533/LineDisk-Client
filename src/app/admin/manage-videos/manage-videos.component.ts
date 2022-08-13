import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VideosService } from './../../services/videos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-videos',
  templateUrl: './manage-videos.component.html',
  styleUrls: ['./manage-videos.component.scss']
})
export class ManageVideosComponent implements OnInit {
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [2,5,10,20];
  total:any;
  selectedVideoId :any;


  MyVideos:any;
  constructor(private uploadService:VideosService, public router:Router,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
this.getAllVideos();
  }
  getAllVideos(){
    const queryParams = `?pageSize=${this.postsPerPage}&page=${this.currentPage}`;
    this.uploadService.getAllVideos(localStorage.getItem('token'),queryParams).subscribe((res:any) => {
      console.log(res.data);
      this.MyVideos = res.data;
      this.total = res.total;
    });
  }
edit(id:any){
  this.router.navigate(['/edit', id]);
}
delete(id:any){
  this.uploadService.deleteVideoById(id).subscribe((res:any) => {
    if(res.result == true){
      this.snackbar.open('File Deleted Successfully!', '', {duration: 2000});
      this.getAllVideos();
    }else{
      this.snackbar.open('File Deletion faild!', '', {duration: 2000});
    }
  })
}
playVideo(url:any){
  this.router.navigate(['/player',url]);
}

onChangedPage(pageData: PageEvent){
  this.currentPage = pageData.pageIndex + 1;
  this.postsPerPage = pageData.pageSize;
  this.getAllVideos();
}
deleteClick(id:any){
  this.selectedVideoId = id;
}
}
