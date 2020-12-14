import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    declarations:[

    ],
    imports: [
        RouterModule,
        AdminRoutingModule,
        SharedModule
      ]

})

export class AdminModule { }

