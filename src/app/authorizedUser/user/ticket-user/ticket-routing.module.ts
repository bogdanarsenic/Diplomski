import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketUserComponent } from './ticket-user.component';

const routes:Routes=[
    {
      path:'',
      component:TicketUserComponent,

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
export class TicketRoutingModule { }
