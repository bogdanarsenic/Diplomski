import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowTimetableComponent } from './timetable/show-timetable/show-timetable.component';
import { TimetableComponent } from './timetable/timetable.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import { LinesComponent } from './lines/lines.component';
import { MapComponent } from './lines/map/map.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { LineListComponent } from './lines/line-list/line-list.component';
import { AgmCoreModule } from '@agm/core';
import { ModalComponent } from "../authorizedUser/admin/lines-admin/modal/modal.component";



@NgModule({
    declarations:[
        ShowTimetableComponent,
        TimetableComponent,
        PricelistComponent,
        LinesComponent,
        MapComponent,
        VehiclesComponent,
        LineListComponent,
        ModalComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'}),

      ],
    exports:[
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ShowTimetableComponent,
        TimetableComponent,
        PricelistComponent,
        LinesComponent,
        MapComponent,
        VehiclesComponent,
        LineListComponent,
        ModalComponent
    ]

})

export class SharedModule { }

