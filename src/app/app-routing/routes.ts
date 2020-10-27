import { Routes } from '@angular/router';
import { AddTimetableComponent } from '../authorizedUser/admin/timetable-admin/add-timetable/add-timetable.component';
import { EditTimetableComponent } from '../authorizedUser/admin/timetable-admin/edit-timetable/edit-timetable.component';
import { TimetableAdminComponent } from '../authorizedUser/admin/timetable-admin/timetable-admin.component';

import { ValidateComponent } from '../authorizedUser/controller/validate/validate.component';
import { VerifyComponent } from '../authorizedUser/controller/verify/verify.component';
import { EditprofileComponent } from '../authorizedUser/editprofile/editprofile.component';
import { ImageUploadComponent } from '../authorizedUser/user/image-upload/image-upload.component';
import { MapComponent } from '../shared/map/map.component';
import { PricelistComponent } from '../shared/pricelist/pricelist.component';
import { ShowTimetableComponent } from '../shared/timetable/show-timetable/show-timetable.component';
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
    { path: 'lines', component:MapComponent},
    { path: 'timetable-admin', component:TimetableAdminComponent},
    { path: 'image-upload', component:ImageUploadComponent},

]