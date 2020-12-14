import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { UnAuthorizedRoutingModule } from './unauthorizedRouting.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
        UnAuthorizedRoutingModule, 
      ]

})

export class UnauthorizedUserModule { }

