import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes=[
    {
      path:'',

      children:[

        {  
          path:'timetable',loadChildren: ()=>import('./timetable-admin/timetable.module').then(m=>m.TimetableModule) 
        },
        {
          path:'lines',loadChildren: ()=>import('./lines-admin/lines.module').then(m=>m.LinesModule)
        },
        {
          path:'pricelist',loadChildren: ()=>import('./pricelist-admin/pricelist.module').then(m=>m.PricelistModule)
        }

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
export class AdminRoutingModule { }
