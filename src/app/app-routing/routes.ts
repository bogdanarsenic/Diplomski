import { Routes } from '@angular/router';
import { LinesAdminComponent } from '../authorizedUser/admin/lines-admin/lines-admin.component';
import { TimetableAdminComponent } from '../authorizedUser/admin/timetable-admin/timetable-admin.component';
import { ValidateComponent } from '../authorizedUser/controller/validate/validate.component';
import { VerifyComponent } from '../authorizedUser/controller/verify/verify.component';
import { EditprofileComponent } from '../authorizedUser/editprofile/editprofile.component';
import { ImageUploadComponent } from '../authorizedUser/user/image-upload/image-upload.component';
import { LinesComponent } from '../shared/lines/lines.component';
import { PricelistComponent } from '../shared/pricelist/pricelist.component';
import { TicketComponent } from '../shared/pricelist/ticket/ticket.component';
import { TimetableComponent } from '../shared/timetable/timetable.component';
import { VehiclesComponent } from '../shared/vehicles/vehicles.component';
import { LoginComponent } from '../unauthorizedUser/login/login.component';
import { RegisterComponent } from '../unauthorizedUser/register/register.component';


export const routes:Routes=[
    { path: 'register',component:RegisterComponent},
    { path: 'login',component:LoginComponent},
    { path: 'timetable',component:TimetableComponent},
    { path: 'vehicles',component:VehiclesComponent},
    { path: 'verify',component:VerifyComponent},
    { path: 'validate',component:ValidateComponent},
    { path: 'pricelist',component:PricelistComponent},
    { path: 'editprofile',component:EditprofileComponent},
    { path: 'lines', component:LinesComponent},
    { path: 'timetable-admin', component:TimetableAdminComponent},
    { path: 'lines-admin', component:LinesAdminComponent},
    { path: 'image-upload', component:ImageUploadComponent},
    { path: 'ticket-proba', component:TicketComponent}

]