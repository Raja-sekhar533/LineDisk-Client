import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VideosService } from './../../services/videos.service';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService,  } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';

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

  videoId:any;
  MyVideos:any;
  constructor(private uploadService:VideosService, public router:Router,private snackbar:MatSnackBar,private nbMenuService: NbMenuService) { }

  ngOnInit(): void {
this.getAllVideos();
this.nbMenuService.onItemClick()
.pipe(
  filter(({ tag }) => tag === 'my-context-menu'),
  map(({ item: { title } }) => title),
)
.subscribe((title: string) => {
  console.log(title+ "title")
  if(title == "Delete"){
    this.delete(this.videoId);
  }
});
  }
  getAllVideos(){
    const queryParams = `?pageSize=${this.postsPerPage}&page=${this.currentPage}`;
    this.uploadService.getAllVideos(localStorage.getItem('admintoken'),queryParams).subscribe((res:any) => {
      console.log(res.data);
      this.MyVideos = res.data;
      this.total = res.total;
    });
  }
  saveId(id:any){
    this.videoId = id;
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
itemss: NbMenuItem[] = [

  {
    title:'Delete',
    icon: 'trash-2-outline',
  },
]
}
