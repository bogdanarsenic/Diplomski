import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes=[
    {
        path:'pricelist',loadChildren: ()=>import('./ticket-user/ticket.module').then(m=>m.TicketModule) 
    },
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
export class UserRoutingModule { }
