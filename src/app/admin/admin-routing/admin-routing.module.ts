import { AdminGuard } from './../../guards/admin.guard';
import { ManagePaymentsComponent } from './../manage-payments/manage-payments.component';
import { SearchBiIdComponent } from './../search-bi-id/search-bi-id.component';
import { AdminLoginComponent } from './../admin-login/admin-login.component';
import { AdminHomePageComponent } from './../admin-home-page/admin-home-page.component';
import { ManageVideosComponent } from './../manage-videos/manage-videos.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'Admin', children:[
    {path: '', component:AdminHomePageComponent,canActivate: [AdminGuard]},
    { path: 'all-videos', component:ManageVideosComponent ,canActivate: [AdminGuard] },
    {path:'login', component: AdminLoginComponent},
    {path:'manage-videos', component:ManageVideosComponent,canActivate: [AdminGuard]},
    {path:'search-by-id', component:SearchBiIdComponent,canActivate: [AdminGuard]},
    {path:'manage-payments', component:ManagePaymentsComponent,canActivate: [AdminGuard]}
  ]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 

  
}
