import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CanActivateViaAuthorizedGuard } from './auth/guards/authorizedUser.guard';
import { CanActivateRoleGuard } from './auth/guards/role.guard';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { NotificationService } from './services/notification.service';


@NgModule({

    providers:[
        CanActivateViaAuthorizedGuard,
        CanActivateRoleGuard,
    
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        NotificationService,
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},

    ]
})

export class CoreModule{}