import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class CanActivateViaAuthorizedGuard implements CanActivate {

  constructor(private router:Router, private authService:AuthService) {}

  canActivate() {

    if(!this.authService.isAuthenticated())
        {
            alert("Your token expired!");
            localStorage.clear();  
            this.router.navigate(['signIn/login']);   
            return false;  
        }
      return true;
  }
}