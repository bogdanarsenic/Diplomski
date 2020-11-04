import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationService } from './services/notification.service';
import { HttpClickService } from './services/click-http.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ModalComponent } from './authorizedUser/admin/modal/modal.component';
import { CanActivateViaAdminGuard } from './auth/guards/admin.guard';
import { CanActivateViaControllerGuard } from './auth/guards/controller.guard';
import { CanActivateViaUserGuard } from './auth/guards/user.guard';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { EditTicketComponent } from './authorizedUser/admin/edit-ticket/edit-ticket.component';
import { ValidateComponent } from './authorizedUser/controller/validate/validate.component';
import { EditprofileComponent } from './authorizedUser/editprofile/editprofile.component';
import { ImageUploadComponent } from './authorizedUser/user/image-upload/image-upload.component';
import { RegisterComponent } from './unauthorizedUser/register/register.component';
import { LoginComponent } from './unauthorizedUser/login/login.component';
import { VehiclesComponent } from './shared/vehicles/vehicles.component';
import { TimetableComponent } from './shared/timetable/timetable.component';
import { PricelistComponent } from './shared/pricelist/pricelist.component';
import { ShowTimetableComponent } from './shared/timetable/show-timetable/show-timetable.component';
import { TimetableAdminComponent } from './authorizedUser/admin/timetable-admin/timetable-admin.component';
import { EditTimetableComponent } from './authorizedUser/admin/timetable-admin/edit-timetable/edit-timetable.component';
import { AddTimetableComponent } from './authorizedUser/admin/timetable-admin/add-timetable/add-timetable.component';
import { FormTimetableComponent } from './authorizedUser/admin/timetable-admin/form-timetable/form-timetable.component';
import { MapComponent } from './shared/lines/map/map.component';
import { LinesComponent } from './shared/lines/lines.component';
import { LineListComponent } from './shared/lines/line-list/line-list.component';
import { LinesAdminComponent } from './authorizedUser/admin/lines-admin/lines-admin.component';
import { AddLinesComponent } from './authorizedUser/admin/lines-admin/add-lines/add-lines.component';
import { EditLinesComponent } from './authorizedUser/admin/lines-admin/edit-lines/edit-lines.component';
import { TicketUserComponent } from './authorizedUser/user/ticket-user/ticket-user.component';
import { ReserveComponent } from './authorizedUser/user/ticket-user/reserve/reserve.component';
import { ShowComponent } from './authorizedUser/user/ticket-user/show/show.component';
import { PaypalComponent } from './authorizedUser/user/ticket-user/paypal/paypal.component';
import { TicketComponent } from './shared/pricelist/ticket/ticket.component';
import { NavigationComponent } from './shared/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ModalComponent,
    EditTicketComponent,
    ImageUploadComponent,
    ValidateComponent,
    EditprofileComponent,
    LoginComponent,
    MapComponent,
    PricelistComponent,
    RegisterComponent,
    TimetableComponent,
    VehiclesComponent,
    ShowTimetableComponent,
    AddTimetableComponent,
    EditTimetableComponent,
    TimetableAdminComponent,
    FormTimetableComponent,
    LinesComponent,
    LineListComponent,
    AddLinesComponent,
    EditLinesComponent,
    LinesAdminComponent,
    TicketUserComponent,
    ReserveComponent,
    ShowComponent,
    PaypalComponent,
    TicketComponent
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
