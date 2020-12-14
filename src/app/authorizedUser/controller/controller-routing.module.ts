import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ValidateComponent } from './validate/validate.component';
import { VerifyComponent } from './verify/verify.component';

const routes:Routes=[
    {
      path:'',

      children:[
        { path:'verify',component:VerifyComponent},
        { path:'validate',component:ValidateComponent},
      ]
    }
  ]

@NgModule({
  
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ]

})
export class ControllerRoutingModule { }
