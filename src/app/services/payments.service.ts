import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private baseUrl = environment.BACKENDURL;

  constructor(private http: HttpClient) { }

  sendPaymentReq(id:any, data:any){
    console.log(data)
    return this.http.post<any>(`${this.baseUrl}payment/paymentReq/${id}`, data);
  }
  getPaymentsById(id:any){
    return this.http.get<any>(`${this.baseUrl}payment/getPaymentsById/${id}`);
  }
  getAllPaymentRequests(token:any){
    return this.http.get<any>(`${this.baseUrl}payment/getAllPayments/${token}`);
  }
  changeStatus(id:any, status:any){
  
      return this.http.post<any>(`${this.baseUrl}payment/updateById/${id}`,status);
    
  }
  addNotification(token:any, data:any){
    return this.http.post(`${this.baseUrl}notification/addNotification/${token}`,data);
  }
  getNotifications(token:any){
    return this.http.get<any>(`${this.baseUrl}notification/getNotificationsById/${token}`);
  }
  updateNotifications(id:any){
    return this.http.get<any>(`${this.baseUrl}notification/updateNotificationsById/${id}`);
  }
}
