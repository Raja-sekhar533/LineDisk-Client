import { PaymentsService } from './../../services/payments.service';
import { NotificationServiceService } from './../../services/notification-service.service';
import { Component, OnInit } from '@angular/core';
import  {io} from 'socket.io-client';
import { NbComponentStatus, NbMenuItem, NbMenuService, NbToastrService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-payments',
  templateUrl: './manage-payments.component.html',
  styleUrls: ['./manage-payments.component.scss']
})
export class ManagePaymentsComponent implements OnInit {
  private socket: any;
  public data1: any;
  paymentDetails:any;
  userId:any;
  itemss: NbMenuItem[] = [

    {
      title:'Auditing',
      icon: 'checkmark-circle-outline',
      badge: {
        dotMode: true,
        status: 'primary',
      },
    },
    {
      title:'InProgress',
      icon: 'clock-outline',
      badge: {
        dotMode: true,
        status: 'warning',
      },
    },
    {
      title:'Approved',
      icon: 'checkmark-square-2-outline',
      badge: {
        dotMode: true,
        status: 'success',
      },
    },
    {
      title:'Rejected',
      icon: 'close-circle-outline',
      badge: {
        dotMode: true,
        status: 'danger',
      },
    },
  ]
  videoId: any;
  constructor(private service:NotificationServiceService, private paymentService:PaymentsService,private nbMenuService: NbMenuService,private toastrService: NbToastrService) {

   }
  ngOnInit(): void {
this.service.getChatList().subscribe(res => {
  console.log(res)
});
this.getPaymentsById();
this.nbMenuService.onItemClick()
.pipe(
  filter(({ tag }) => tag === 'my-context-menu3'),
  map(({ item: { title } }) => title),
)
.subscribe((title: string) => {
  console.log(title)
  this.ChangeStatus(title);
});
  }
  getPaymentsById(){
    this.paymentService.getAllPaymentRequests(localStorage.getItem("token")).subscribe(res => {
      this.paymentDetails=res.data.reverse();
      console.log(this.paymentDetails)
    })
  }

  saveId(id:any, userId:any){
    this.videoId = id;
    this.userId = userId;
  }

  ChangeStatus(status:any){
    let data = {
      pId:this.videoId,
      status:status
    }

    this.paymentService.changeStatus(localStorage.getItem("admintoken"),data).subscribe(res => {
      if(res.status == true){
        this.showToast('Status changed Successfully .', 'success');
        let msg = {
          userId:this.userId,
          message:`Your payment request status changed to ${status}`
        }

        this.paymentService.addNotification(localStorage.getItem('admintoken'),msg).subscribe(res => {
          console.log(res)
        })
        this.service.sendPaymentStatus(msg).subscribe(res => {
          console.log(res)
        })
      }else{
        this.showToast('Status Changing Faild', 'danger')
      }
      this.getPaymentsById();
    })
  }

  showToast(value:any,status: NbComponentStatus) {
    this.toastrService.show(status, `${value} `, { status });
  }
}
