import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.BACKENDURL;
  constructor(private http: HttpClient) { }
  signup(data:any){
    const req = new HttpRequest('POST', `${this.baseUrl}auth/signup`, data, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.post<any>(`${this.baseUrl}auth/signup`,req); 
   }

    Login(form:any){
     return this.http.post(`${this.baseUrl}auth/login`, form);
    }
    AdminLogin(form:any){
     return this.http.post(`${this.baseUrl}auth/adminlogin`, form);
    }


    loggedIn(){
      if(localStorage.getItem('token')){
        return true;
      }else{
        return false
      }
       
    }
    getRevenue(id:any){
      return this.http.get<any>(`${this.baseUrl}auth/getRevenueById/${id}`);
    }

}
