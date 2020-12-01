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
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ModalComponent } from './authorizedUser/admin/modal/modal.component';
import { CanActivateViaAdminGuard } from './auth/guards/admin.guard';
import { CanActivateViaControllerGuard } from './auth/guards/controller.guard';
import { CanActivateViaUserGuard } from './auth/guards/user.guard';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { ValidateComponent } from './authorizedUser/controller/validate/validate.component';
import { EditprofileComponent } from './authorizedUser/editprofile/editprofile.component';
import { ImageUploadComponent } from './authorizedUser/user/image-upload/image-upload.component';
import { RegisterComponent } from './unauthorizedUser/register/register.component';
import { LoginComponent } from './unauthorizedUser/login/login.component';
import { VehiclesComponent } from './sharedComponents/vehicles/vehicles.component';
import { TimetableComponent } from './sharedComponents/timetable/timetable.component';
import { ShowTimetableComponent } from './sharedComponents/timetable/show-timetable/show-timetable.component';
import { TimetableAdminComponent } from './authorizedUser/admin/timetable-admin/timetable-admin.component';
import { EditTimetableComponent } from './authorizedUser/admin/timetable-admin/edit-timetable/edit-timetable.component';
import { AddTimetableComponent } from './authorizedUser/admin/timetable-admin/add-timetable/add-timetable.component';
import { FormTimetableComponent } from './authorizedUser/admin/timetable-admin/form-timetable/form-timetable.component';
import { MapComponent } from './sharedComponents/lines/map/map.component';
import { LinesComponent } from './sharedComponents/lines/lines.component';
import { LineListComponent } from './sharedComponents/lines/line-list/line-list.component';
import { LinesAdminComponent } from './authorizedUser/admin/lines-admin/lines-admin.component';
import { AddLinesComponent } from './authorizedUser/admin/lines-admin/add-lines/add-lines.component';
import { EditLinesComponent } from './authorizedUser/admin/lines-admin/edit-lines/edit-lines.component';
import { TicketUserComponent } from './authorizedUser/user/ticket-user/ticket-user.component';
import { ReserveComponent } from './authorizedUser/user/ticket-user/reserve/reserve.component';
import { ShowComponent } from './authorizedUser/user/ticket-user/show/show.component';
import { PaypalComponent } from './authorizedUser/user/ticket-user/paypal/paypal.component';
import { NavigationComponent } from './sharedComponents/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './authorizedUser/controller/verify/verify.component';
import { PricelistComponent } from './sharedComponents/pricelist/pricelist.component';
import { PricelistAdminComponent } from './authorizedUser/admin/pricelist-admin/pricelist-admin.component';
import { EditPricelistComponent } from './authorizedUser/admin/pricelist-admin/edit-pricelist/edit-pricelist.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ModalComponent,
    ImageUploadComponent,
    ValidateComponent,
    EditprofileComponent,
    LoginComponent,
    MapComponent,
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
    VerifyComponent,
    EditPricelistComponent,
    PricelistComponent,
    PricelistAdminComponent ],
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
    CommonModule

  ],
  providers: [
    CanActivateViaAdminGuard,
    CanActivateViaControllerGuard,
    CanActivateViaUserGuard,

    NotificationService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
