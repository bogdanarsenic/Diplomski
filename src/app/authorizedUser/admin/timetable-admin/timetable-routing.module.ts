import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimetableAdminComponent } from './timetable-admin.component';


const routes:Routes=[
    {
      path:'',
      component:TimetableAdminComponent
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
export class TimetableRoutingModule { }
