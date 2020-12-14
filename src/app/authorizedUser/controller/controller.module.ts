import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ControllerRoutingModule } from './controller-routing.module';
import { ValidateComponent } from './validate/validate.component';
import { VerifyComponent } from './verify/verify.component';



@NgModule({
    declarations:[
        VerifyComponent,
        ValidateComponent

    ],
    imports: [
        RouterModule,
        ControllerRoutingModule,
        SharedModule
      ]

})

export class ControllerModule { }

