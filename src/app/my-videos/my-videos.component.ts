import { PlayerComponent } from './../player/player.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosService } from './../services/videos.service';
import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NB_WINDOW } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss']
})
export class MyVideosComponent implements OnInit {
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [2,5,10,20];
  total:any;
  videoId:any;
  MyVideos:any;
  isUpdated:boolean | undefined;
  constructor(private uploadService:VideosService, public router:Router,private snackbar:MatSnackBar,private nbMenuService: NbMenuService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    localStorage.removeItem("url");
    localStorage.removeItem("title");
    this.getVideosById();
    this.nbMenuService.onItemClick()
    .pipe(
      filter(({ tag }) => tag === 'my-context-menu'),
      map(({ item: { title } }) => title),
    )
    .subscribe(title => {
      if(title == "Edit"){
        this.edit(this.videoId);
      }else{
        this.delete(this.videoId);
      }
    });

  }
  saveId(id:any){
    this.videoId = id;
  }
  getVideosById():void{
    const queryParams = `?pageSize=${this.postsPerPage}&page=${this.currentPage}`;
    this.uploadService.getVideosById(localStorage.getItem('token'),queryParams).subscribe((res:any) => {
      this.MyVideos = res.data.reverse();
      this.total = res.total;
      // if(!this.isUpdated){
      //   this.isUpdated = true;
      //   window.location.reload();
      // }
    });
  }
edit(id:any){
  this.router.navigate(['/edit', id]);
}
delete(id:any){
  this.uploadService.deleteVideoById(id).subscribe((res:any) => {
    if(res.result == true){
      this.snackbar.open('File Deleted Successfully!', '', {duration: 2000});
      this.getVideosById();
    }else{
      this.snackbar.open('File Deletion faild!', '', {duration: 2000});
    }
  })
}

playVideo(data:any){
  let usId = data.userId;

  localStorage.setItem("VusrId", data.userId);
  localStorage.setItem("vidId", data._id);
  localStorage.setItem("url", data.videourl);
  localStorage.setItem("title",data.filetitle.substring(0,40) + "....");
  localStorage.setItem("size", data.fileSize);
  localStorage.setItem("uploadedDate", data.date);
  localStorage.setItem("Description", data.fileDescription);
  localStorage.setItem("VideoUser", "****" + usId.substring(16))

  this.router.navigate(['/player',data._id]);
}

onChangedPage(pageData: PageEvent){
  this.currentPage = pageData.pageIndex + 1;
  this.postsPerPage = pageData.pageSize;
  this.getVideosById();
}

itemss: NbMenuItem[] = [
  {
    title:'Edit',
    icon: 'edit-2-outline',
  },
  {
    title:'Delete',
    icon: 'trash-2-outline',
  },
]
copyMessage(val: string){
  let path = window.location.origin + '/player/' + val;
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = path;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
}

// check(e:any){
//   console.log(e)
// }

}
