import { VideosService } from './../../services/videos.service';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-bi-id',
  templateUrl: './search-bi-id.component.html',
  styleUrls: ['./search-bi-id.component.scss']
})
export class SearchBiIdComponent implements OnInit {
  videoId: any;

  constructor(private videService:VideosService,private nbMenuService: NbMenuService,private uploadService:VideosService, public router:Router,private snackbar:MatSnackBar,) { }
  searchedVideo:any;
  isResponse=false;
  noDataFound=false;
  ngOnInit(): void {
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
  search(e:any){
    this.videService.getVideoById(e.target.value).subscribe(res => {
      if(res){
        this.searchedVideo = res;
        this.isResponse = true;
        this.noDataFound = false;

      }else{
this.noDataFound = true;
this.isResponse = false;

      }
    })
  }

  itemss: NbMenuItem[] = [

    {
      title:'Delete',
      icon: 'trash-2-outline',
    },
  ]
  saveId(id:any){
    this.videoId = id;
  }

  delete(id:any){
    this.uploadService.deleteVideoById(id).subscribe((res:any) => {
      if(res.result == true){
        this.snackbar.open('File Deleted Successfully!', '', {duration: 2000});
        this.isResponse = false;
      }else{
        this.snackbar.open('File Deletion faild!', '', {duration: 2000});
      }
    })
  }
}
