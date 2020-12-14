import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaypalComponent } from './paypal/paypal.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ShowComponent } from './show/show.component';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketUserComponent } from './ticket-user.component';




@NgModule({
    declarations:[
        TicketUserComponent,
        ReserveComponent,
        ShowComponent,
        PaypalComponent,
    ],
    imports: [
        RouterModule,
        TicketRoutingModule,
        SharedModule
      ]

})

export class TicketModule { }