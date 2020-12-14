import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
    declarations:[

    ],
    imports: [
        RouterModule,
        UserRoutingModule,
        SharedModule
      ]

})

export class UserModule { }

