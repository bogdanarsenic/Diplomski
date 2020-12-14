import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateViaUserGuard } from '../auth/guards/user.guard';
import { EditprofileComponent } from './editprofile/editprofile.component';

const routes:Routes=[
  
  {  path:'edit',component:EditprofileComponent  },
  {  path:'image-upload',loadChildren: ()=>import('./user/image-upload/image-upload.module').then(m=>m.ImageUploadModule), canActivate:[CanActivateViaUserGuard] }

]

@NgModule({
  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class AuthorizedRoutingModule { }
