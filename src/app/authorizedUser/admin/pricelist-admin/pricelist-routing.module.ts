import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PricelistAdminComponent } from './pricelist-admin.component';


const routes:Routes=[
    {
      path:'',
      component: PricelistAdminComponent,

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
export class PricelistRoutingModule { }
