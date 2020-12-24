import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TimetableComponent } from './shared/timetable/timetable.component';
import { VehiclesComponent } from './shared/vehicles/vehicles.component';
import { LinesComponent } from './shared/lines/lines.component';
import { CanActivateRoleGuard } from './auth/guards/role.guard';
import { PricelistComponent } from './shared/pricelist/pricelist.component';


const routes:Routes=[
    
   // { path: '',redirectTo:'/timetable', pathMatch:"full" },

    { path: 'signIn', loadChildren: ()=>import('./unauthorizedUser/unauthorizedUserModule.module').then(m=>m.UnauthorizedUserModule)},
    { path: 'profile', loadChildren: ()=>import('./authorizedUser/authorizedUserModule.module').then(m=>m.AuthorizedUserModule), canActivate:[CanActivateRoleGuard],data: { expectedRole: 'Admin' || 'Controller' || 'AppUser' }},
    { path: 'admin', loadChildren: ()=>import('./authorizedUser/admin/admin.module').then(m=>m.AdminModule),canActivate:[CanActivateRoleGuard],data: { expectedRole: 'Admin' }},
    { path: 'controller', loadChildren: ()=>import('./authorizedUser/controller/controller.module').then(m=>m.ControllerModule), canActivate:[CanActivateRoleGuard],data: { expectedRole: 'Controller' } },
    { path: 'user', loadChildren: ()=>import('./authorizedUser/user/user.module').then(m=>m.UserModule),canActivate:[CanActivateRoleGuard],data: { expectedRole: 'AppUser' }},
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
