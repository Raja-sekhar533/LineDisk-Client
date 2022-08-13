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
  {path:'home', component:HomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component: LoginComponent},
  {path:'upload', component:UploadComponent},
  {path:'myvideos', component:MyVideosComponent},
  {path:'edit/:id', component:EditVideoComponent},
  {path:'income', component:IncomeComponent},
  {path:'player/:id', component:PlayerComponent},
  {path:'withdraw-bank', component:WithdrawBankComponent},
  {path:'my-withdrawal', component:MyWithdrawalComponent},
  {path:'Admin/login', component:AdminLoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
