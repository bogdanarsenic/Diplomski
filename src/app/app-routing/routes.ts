import { Routes } from '@angular/router';
import { AddTimetableComponent } from '../authorizedUser/admin/add-timetable/add-timetable.component';
import { ValidateComponent } from '../authorizedUser/controller/validate/validate.component';
import { VerifyComponent } from '../authorizedUser/controller/verify/verify.component';
import { EditprofileComponent } from '../authorizedUser/editprofile/editprofile.component';
import { ImageUploadComponent } from '../authorizedUser/user/image-upload/image-upload.component';
import { MapComponent } from '../map/map.component';
import { PricelistComponent } from '../pricelist/pricelist.component';
import { TimetableComponent } from '../timetable/timetable.component';
import { LoginComponent } from '../unauthorizedUser/login/login.component';
import { RegisterComponent } from '../unauthorizedUser/register/register.component';

import { VehiclesComponent } from '../vehicles/vehicles.component';

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
    { path: 'addtimetable', component:AddTimetableComponent},
    { path: 'image-upload', component:ImageUploadComponent},

]