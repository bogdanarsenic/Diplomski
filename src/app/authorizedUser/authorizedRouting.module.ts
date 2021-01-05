import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateRoleGuard } from '../auth/guards/role.guard';
import { EditprofileComponent } from './editprofile/editprofile.component';

const routes:Routes=[
  
  {  path:'edit',component:EditprofileComponent  },
  {  path:'image-upload',loadChildren: ()=>import('./user/image-upload/image-upload.module').then(m=>m.ImageUploadModule), canActivate:[CanActivateRoleGuard],data: { expectedRole: 'AppUser' } }

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
