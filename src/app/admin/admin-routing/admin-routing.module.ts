import { AdminHomePageComponent } from './../admin-home-page/admin-home-page.component';
import { ManageVideosComponent } from './../manage-videos/manage-videos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'Admin', children:[
    {path: '', component:AdminHomePageComponent},
    { path: 'all-videos', component:ManageVideosComponent  }

  ]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 

  
}
