import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class CanActivateRoleGuard implements CanActivate {

  constructor(private router:Router, private authService:AuthService,private jwtHelper: JwtHelperService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean  {

      const expectedRole = route.data.expectedRole;
      const token = localStorage.getItem('jwt');
      
      const tokenPayload = this.jwtHelper.decodeToken(token);
      
      if (!this.authService.isAuthenticated() || tokenPayload.role !== expectedRole) {

        this.router.navigate(['signIn/login']);   
        return false;
      }
      return true;
    }

  }
