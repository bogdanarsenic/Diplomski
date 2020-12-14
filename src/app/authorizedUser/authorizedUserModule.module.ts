import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AuthorizedRoutingModule } from './authorizedRouting.module';

@NgModule({
    declarations:[
        EditprofileComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
        AuthorizedRoutingModule, 
      ]

})

export class AuthorizedUserModule { }

