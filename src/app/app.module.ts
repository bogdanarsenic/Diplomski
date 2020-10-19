import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NavigationComponent } from './navigation/navigation.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {AgmCoreModule} from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationService } from './services/notification.service';
import { HttpClickService } from './services/click-http.service';


import { AppRoutingModule } from './app-routing/app-routing.module';

import { MapComponent } from './map/map.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import { TimetableComponent } from './timetable/timetable.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ModalComponent } from './authorizedUser/admin/modal/modal.component';
import { CanActivateViaAdminGuard } from './auth/guards/admin.guard';
import { CanActivateViaControllerGuard } from './auth/guards/controller.guard';
import { CanActivateViaUserGuard } from './auth/guards/user.guard';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AddTimetableComponent } from './authorizedUser/admin/add-timetable/add-timetable.component';
import { EditTicketComponent } from './authorizedUser/admin/edit-ticket/edit-ticket.component';
import { EditTimetableComponent } from './authorizedUser/admin/edit-timetable/edit-timetable.component';
import { ValidateComponent } from './authorizedUser/controller/validate/validate.component';
import { EditprofileComponent } from './authorizedUser/editprofile/editprofile.component';
import { AddTicketComponent } from './authorizedUser/user/add-ticket/add-ticket.component';
import { ImageUploadComponent } from './authorizedUser/user/image-upload/image-upload.component';
import { RegisterComponent } from './unauthorizedUser/register/register.component';
import { LoginComponent } from './unauthorizedUser/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,

    ModalComponent,
    EditTicketComponent,
    EditTimetableComponent,
    AddTimetableComponent,
    ImageUploadComponent,
    ValidateComponent,
    EditprofileComponent,
    LoginComponent,
    MapComponent,
    PricelistComponent,
    RegisterComponent,
    TimetableComponent,
    VehiclesComponent,
    AddTicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'}),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,

  ],
  providers: [
    CanActivateViaAdminGuard,
    CanActivateViaControllerGuard,
    CanActivateViaUserGuard,

    NotificationService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    HttpClickService
    ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
