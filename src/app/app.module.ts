import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NavigationComponent } from './navigation/navigation.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

import {CanActivateViaAdminGuard} from './guards/admin.guard';
import {CanActivateViaUserGuard} from './guards/user.guard';
import {CanActivateViaControllerGuard} from './guards/controller.guard';
import {AgmCoreModule} from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationService } from './services/notification.service';
import { HttpClickService } from './services/click-http.service';
import { EditTimetableComponent } from './admin/edit-timetable/edit-timetable.component';
import { AddTimetableComponent } from './admin/add-timetable/add-timetable.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';

import { EditTicketComponent } from './admin/edit-ticket/edit-ticket.component';
import { ModalComponent } from './admin/modal/modal.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ValidateComponent } from './controller/validate/validate.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import { RegisterComponent } from './register/register.component';
import { TimetableComponent } from './timetable/timetable.component';
import { VehiclesComponent } from './vehicles/vehicles.component';


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
    VehiclesComponent
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
