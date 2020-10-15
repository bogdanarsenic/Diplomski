import { Routes } from '@angular/router';
import { ValidateComponent } from '../controller/validate/validate.component';
import { VerifyComponent } from '../controller/verify/verify.component';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { LoginComponent } from '../login/login.component';
import { MapComponent } from '../map/map.component';
import { PricelistComponent } from '../pricelist/pricelist.component';
import { RegisterComponent } from '../register/register.component';
import { TimetableComponent } from '../timetable/timetable.component';
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
    { path: 'lines', component:MapComponent}
    
]