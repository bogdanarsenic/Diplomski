import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditPricelistComponent } from './edit-pricelist/edit-pricelist.component';
import { PricelistAdminComponent } from './pricelist-admin.component';
import { PricelistRoutingModule } from './pricelist-routing.module';



@NgModule({
    declarations:[
        EditPricelistComponent,
        PricelistAdminComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        PricelistRoutingModule
      ]

})

export class PricelistModule { }