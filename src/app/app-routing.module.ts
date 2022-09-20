import { TermsComponent } from './terms/terms.component';
import { AuthguardGuard } from './guards/authguard.guard';
import { NotificationsuiComponent } from './notificationsui/notificationsui.component';
import { MyWithdrawalComponent } from './my-withdrawal/my-withdrawal.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ManageAdminsComponent } from './admin/manage-admins/manage-admins.component';
import { ManageVideosComponent } from './admin/manage-videos/manage-videos.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { WithdrawBankComponent } from './withdraw-bank/withdraw-bank.component';
import { PlayerComponent } from './player/player.component';
import { IncomeComponent } from './income/income.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { MyVideosComponent } from './my-videos/my-videos.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent, canActivate: [AuthguardGuard]},
  {path:'signup', component:SignupComponent},
  {path:'login', component: LoginComponent},
  {path:'upload', component:UploadComponent, canActivate: [AuthguardGuard]},
  {path:'myvideos', component:MyVideosComponent, canActivate: [AuthguardGuard]},
  {path:'edit/:id', component:EditVideoComponent, canActivate: [AuthguardGuard]},
  {path:'income', component:IncomeComponent, canActivate: [AuthguardGuard]},
  {path:'notifications', component:NotificationsuiComponent, canActivate: [AuthguardGuard]},
  {path:'player/:id', component:PlayerComponent},
  {path:'withdraw-bank', component:WithdrawBankComponent, canActivate: [AuthguardGuard]},
  {path:'my-withdrawal', component:MyWithdrawalComponent, canActivate: [AuthguardGuard]},
  {path:'Admin/login', component:AdminLoginComponent},
  {path:'terms-and-conditions', component:TermsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
