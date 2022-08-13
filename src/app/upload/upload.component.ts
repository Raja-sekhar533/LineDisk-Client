import { Router } from '@angular/router';
import { VideosService } from './../services/videos.service';
import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  FileTitle ='';
  BackendUrl = environment.BACKENDURL;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  bytesData:any;
  description = '';
  fileInfos?: Observable<any>;
  Uploading = false;
  constructor(private uploadService: VideosService, public router:Router) { }

  ngOnInit(): void {
    // this.fileInfos = this.uploadService.getFiles();
  }

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
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        const date = new Date();

        this.currentFile = file;
        this.Uploading = true;

        this.uploadService.upload(this.currentFile,this.FileTitle, this.bytesData, this.description, date.toString(),localStorage.getItem('token')).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }

  GoToMyVideos(){
    this.router.navigate(['/myvideos']);
  }
  uploadMore(){
    window.location.reload();
  }

}
