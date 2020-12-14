import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LinesAdminComponent } from './lines-admin.component';


const routes:Routes=[
    {
      path:'',
      component:LinesAdminComponent,

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
export class LinesRoutingModule { }
