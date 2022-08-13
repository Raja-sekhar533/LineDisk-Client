import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class VideosService {


  private baseUrl = environment.BACKENDURL;

  constructor(private http: HttpClient) { }

  upload(file: File, title:string, size:any, description:any, date:string, id:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('linediskvideo', file);
    formData.append('title', title);
    formData.append('size', size);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('userId', id);
    const req = new HttpRequest('POST', `${this.baseUrl}video/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/video`);
  }

  getVideosById(token:any,params:any){
    return this.http.get(`${this.baseUrl}video/getvideos/${token}`+params);
  }

  getVideoDetails(id:any){
    return this.http.get<any>(`${this.baseUrl}video/getVideoById/${id}`);
  }

  updateVideo(form:any,date:any,userid:any, videoid:any){
    const data = {
      Filetitle:form.Filetitle,
      Description:form.Description,
      date:date,
      id:userid,
    }
    return this.http.put(`${this.baseUrl}video/updateById/${videoid}`,data);
  }
  deleteVideoById(id:any){
    return this.http.delete(`${this.baseUrl}video/deleteVideoById/${id}`);
  }
  getAllVideos(token:any,queryParams:any){
    return this.http.get(`${this.baseUrl}video/getallvideos/${token}` + queryParams);
  }
  addViewCount(data:any){
    return this.http.post(`${this.baseUrl}video/addView`, data);
  }
  getRevenue(id:any){
    return this.http.get<any>(`${this.baseUrl}video/revenue/${id}`);
  }
  saveToMyDisk(data:any,id:any){
    return this.http.post<any>(`${this.baseUrl}video/savetomydisk/${id}`, data);
  }

  isVideoSaved(data:any){
    return this.http.post<any>(`${this.baseUrl}video/isVideoSaved`,data);
  }
  sendReport(data:any){
    return this.http.post<any>(`${this.baseUrl}report/sendReport`, data)
  }
  getClientIp(){
    return this.http.get("http://api.ipify.org/?format=json")
  }
}
