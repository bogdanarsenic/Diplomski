import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddLinesComponent } from './add-lines/add-lines.component';
import { EditLinesComponent } from './edit-lines/edit-lines.component';
import { LinesAdminComponent } from './lines-admin.component';
import { LinesRoutingModule } from './lines-routing.module';


@NgModule({
    declarations:[
        AddLinesComponent,
        EditLinesComponent,
        LinesAdminComponent
    ],
    imports: [
        RouterModule,
        LinesRoutingModule,
        SharedModule
      ]

})

export class LinesModule { }