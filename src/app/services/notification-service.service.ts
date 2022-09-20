import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
/// <reference path="../path/to/typings.d.ts" />
import * as Rx from 'rxjs';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
const  environment = "http://localhost:4567";
@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  socket: any;

  constructor(private toastrService: NbToastrService) {    
    this.socket = io(environment);
  }

  connect(): Rx.Subject<MessageEvent> {
    // client-side
// const socket = io("https://localhost:4567", {
//   withCredentials: true,
//   transportOptions: {
//     polling: {
//       extraHeaders: {
//         "my-custom-header": "abcd"
//       }
//     }
//   }
// });
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    // this.socket = io(environment);

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {
      this.socket.on('message', (data: any) => {
        console.log("Received message from Websocket Server",data)
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
  });

  // We define our Observer which will listen to messages
  // from our other components and send messages back to our
  // socket server whenever the `next()` method is called.
  let observer = {
      next: (data: Object) => {
          this.socket.emit('message',data);
      },
  };
  this.socket.on(localStorage.getItem('userIds'), (data:any)=> {
    console.log(data);
    observer.next(data);
  });
  // we return our Rx.Subject which is a combination
  // of both an observer and observable.
  return Rx.Subject.create(observer, observable);
}

getChatList(): Observable<any> {
    this.socket.emit('chat-list', { fromUserId: "userId" });

  return new Observable(observer => {
    this.socket.on('chat-list-response', (data:any) => {
      observer.next(data);
      console.log(data, "chat list data");
    });
    return () => {
      this.socket.disconnect();
    };
  });
}
sendPaymentRequest(id:any, data:any):Observable<any>{
  this.socket.emit('send-payment-request', {userId:id, data:data});

  return new Observable(observer => {
    this.socket.on('send-payment-response', (data:any) => {
      observer.next(data);
      console.log(data, "chat list data");
    });
    return () => {
      this.socket.disconnect();
    };
  });

}
sendPaymentStatus(data:any):Observable<any>{
  return new Observable(observer => {

    this.socket.emit('send-payment-status', {data:data});
    this.GetPaymentStatus();
    return () => {
      this.socket.disconnect();
    }
  })
}
GetPaymentStatus():Observable<any>{
  return new Observable(observer => {
    let id = localStorage.getItem('userIds')
    console.log(id)
    this.socket.on(`${id}`, (data:any)=> {
      console.log(data);
      observer.next(data);
    });
    return () => {
      this.socket.disconnect();
    }
  })
}
showToast(value:any,status: NbComponentStatus) {
  this.toastrService.show(status, `${value} `, { status });
}
}
