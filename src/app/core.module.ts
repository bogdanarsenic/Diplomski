import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { CanActivateViaAdminGuard } from './auth/guards/admin.guard';
import { CanActivateViaControllerGuard } from './auth/guards/controller.guard';
import { CanActivateViaUserGuard } from './auth/guards/user.guard';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { NotificationService } from './services/notification.service';


@NgModule({
    providers:[
        
        CanActivateViaAdminGuard,
        CanActivateViaControllerGuard,
        CanActivateViaUserGuard,
    
        NotificationService,
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},

    ]
})

export class CoreModule{}