import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTimetableComponent } from './add-timetable/add-timetable.component';
import { EditTimetableComponent } from './edit-timetable/edit-timetable.component';
import { FormTimetableComponent } from './form-timetable/form-timetable.component';
import { TimetableAdminComponent } from './timetable-admin.component';
import { TimetableRoutingModule } from './timetable-routing.module';



@NgModule({
    declarations:[
        AddTimetableComponent,
        EditTimetableComponent,
        FormTimetableComponent,
        TimetableAdminComponent
    ],
    imports: [
        RouterModule,
        TimetableRoutingModule,
        SharedModule
      ]

})

export class TimetableModule { }