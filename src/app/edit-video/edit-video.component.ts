import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpEventType,
  HttpResponse
} from "@angular/common/http";
import { VideosService } from './../services/videos.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {
  id:any;
  FileTitle ='';
  BackendUrl = environment.BACKENDURL;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  bytesData:any;
  description = '';
  editFormData:any;
  fileInfos?: Observable<any>;
  date = new Date();
  constructor(private uploadService: VideosService,private route: ActivatedRoute,private snackbar: MatSnackBar,private router: Router) {
    
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDetails();
}

profileForm = new FormGroup({
  Filetitle: new FormControl('',[Validators.required]),
  Description: new FormControl('')

});

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    const file: File | null = event.target.files.item(0);
    if(file){
      this.FileTitle = file.name;
      const data = this.formatBytes(file.size);
      this.bytesData = data.size + " " + data.type ;
    }
    console.log(this.FileTitle);
    console.log(this.bytesData);
  }
  formatBytes(bytes:any){
    var kb = 1024;
    var ndx = Math.floor( Math.log(bytes) / Math.log(kb) );
    var fileSizeTypes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    
    return {
      size: +(bytes / kb / kb).toFixed(2),
      type: fileSizeTypes[ndx]
    };
  }

  upload(): void {

        console.log(this.profileForm.value);
        this.uploadService.updateVideo(this.profileForm.value, this.date.toString(),localStorage.getItem('token'), this.id).subscribe((res:any) => {
          if(res.result == true){
            this.snackbar.open('File Details are updated Successfully!', '', {duration: 2000});
            this.router.navigate(['/myvideos']);           }else{
              this.snackbar.open('File Details are update faild!', '', {duration: 2000});          }
        }
        )
     
  }

  getDetails(){
    this.uploadService.getVideoDetails(this.id).subscribe((res:any) => {
      console.log(res.data);
      this.editFormData = res.data.videourl;
      this.profileForm.patchValue({
        Filetitle :res.data.filetitle,
        Description:res.data.fileDescription
      })
     
    });
  }

}
