import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServicesService } from 'src/app/services/services.service';

@Injectable()
export class CanActivateRoleGuard implements CanActivate {

  constructor(private router:Router, private service:ServicesService,private jwtHelper: JwtHelperService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean  {

      const expectedRole = route.data.expectedRole;
      const token = localStorage.getItem('jwt');
      
      const tokenPayload = this.jwtHelper.decodeToken(token);
      
      if (!this.service.isAuthenticated() || tokenPayload.role !== expectedRole) {
        this.router.navigate(['signIn/login']);   
        return false;
      }
      return true;
    }

  }
