import { Routes } from '@angular/router';
import { LinesAdminComponent } from '../authorizedUser/admin/lines-admin/lines-admin.component';
import { PricelistAdminComponent } from '../authorizedUser/admin/pricelist-admin/pricelist-admin.component';
import { TimetableAdminComponent } from '../authorizedUser/admin/timetable-admin/timetable-admin.component';
import { ValidateComponent } from '../authorizedUser/controller/validate/validate.component';
import { VerifyComponent } from '../authorizedUser/controller/verify/verify.component';
import { EditprofileComponent } from '../authorizedUser/editprofile/editprofile.component';
import { ImageUploadComponent } from '../authorizedUser/user/image-upload/image-upload.component';
import { TicketUserComponent } from '../authorizedUser/user/ticket-user/ticket-user.component';
import { LinesComponent } from '../sharedComponents/lines/lines.component';
import { TimetableComponent } from '../sharedComponents/timetable/timetable.component';
import { VehiclesComponent } from '../sharedComponents/vehicles/vehicles.component';
import { LoginComponent } from '../unauthorizedUser/login/login.component';
import { RegisterComponent } from '../unauthorizedUser/register/register.component';


export const routes:Routes=[
    { path: 'register',component:RegisterComponent},
    { path: 'login',component:LoginComponent},
    { path: 'timetable',component:TimetableComponent},
    { path: 'vehicles',component:VehiclesComponent},
    { path: 'verify',component:VerifyComponent},
    { path: 'validate',component:ValidateComponent},
    { path: 'editprofile',component:EditprofileComponent},
    { path: 'lines', component:LinesComponent},
    { path: 'timetable-admin', component:TimetableAdminComponent},
    { path: 'lines-admin', component:LinesAdminComponent},
    { path: 'pricelist-admin',component:PricelistAdminComponent},
    { path: 'image-upload', component:ImageUploadComponent},
    { path: 'pricelist',component:TicketUserComponent},


]