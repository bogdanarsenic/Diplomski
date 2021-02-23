import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { CoreModule } from './core.module';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';
import { StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { createEffect, EffectsModule } from '@ngrx/effects';
import { TimetableEffects } from './authorizedUser/admin/timetable-admin/store/timetable.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
     ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([TimetableEffects]),
    StoreDevtoolsModule.instrument({ logOnly:environment.production }),
    StoreRouterConnectingModule.forRoot(),
    CoreModule

  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
