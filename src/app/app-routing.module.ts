import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TimetableComponent } from './shared/timetable/timetable.component';
import { VehiclesComponent } from './shared/vehicles/vehicles.component';
import { LinesComponent } from './shared/lines/lines.component';
import { CanActivateViaControllerGuard } from './auth/guards/controller.guard';
import { CanActivateViaUserGuard } from './auth/guards/user.guard';
import { CanActivateViaAdminGuard } from './auth/guards/admin.guard';
import { PricelistComponent } from './shared/pricelist/pricelist.component';
import { EditprofileComponent } from './authorizedUser/editprofile/editprofile.component';


const routes:Routes=[
    
   // { path: '',redirectTo:'/timetable', pathMatch:"full" },

    { path: 'signIn', loadChildren: ()=>import('./unauthorizedUser/unauthorizedUserModule.module').then(m=>m.UnauthorizedUserModule)},
    { path: 'profile', loadChildren: ()=>import('./authorizedUser/authorizedUserModule.module').then(m=>m.AuthorizedUserModule)},
    { path: 'admin', loadChildren: ()=>import('./authorizedUser/admin/admin.module').then(m=>m.AdminModule),canActivate:[CanActivateViaAdminGuard]},
    { path: 'controller', loadChildren: ()=>import('./authorizedUser/controller/controller.module').then(m=>m.ControllerModule),canActivate:[CanActivateViaControllerGuard]},
    { path: 'user', loadChildren: ()=>import('./authorizedUser/user/user.module').then(m=>m.UserModule),canActivate:[CanActivateViaUserGuard]},
    { path: 'timetable',component:TimetableComponent},
    { path: 'vehicles',component:VehiclesComponent},
    { path: 'lines', component:LinesComponent},
    { path: 'pricelist',component:PricelistComponent},

];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
