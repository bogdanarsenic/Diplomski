import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Login } from '../shared/classes/Login';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenExpirationTimer:any;

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private router:Router) { }
  
   getRole():string
    {
      if(localStorage.jwt)
      {
            let jwtData=localStorage.jwt.split('.')[1]
            let decodedJwtJsonData=window.atob(jwtData)
            let decodedJwtData=JSON.parse(decodedJwtJsonData)
  
            return decodedJwtData.role
      }
    }
  
  setToken(expiresIn:any){
      var tokenExpires=new Date();
      tokenExpires.setSeconds(tokenExpires.getSeconds() + expiresIn);
      localStorage.setItem('tokenExpiresOn',tokenExpires.toString());
    }
  
   getTheToken(loginUser : Login) : Observable<any>{
      let headers = new HttpHeaders();
      headers = headers.append('Content-type','application/x-www-form-urlencoded');
  
      return this.httpClient.post('https://localhost:44306/oauth/token', 'username='+loginUser.Username+'&password='+loginUser.Password+'&grant_type=password',{"headers": headers});
    
    }
  
    isAuthenticated(): boolean {
      const token = localStorage.getItem('jwt');
      return !this.jwtHelper.isTokenExpired(token);
    }
  
    autoLogout(tokenExpiration:number):any{

      this.tokenExpirationTimer=setTimeout(()=>{
          this.logOut();
          alert("Your token expired!");
        },tokenExpiration);
  
    }
    
    logOut() : any{
  
      if(this.tokenExpirationTimer)
      {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer=null;

      localStorage.clear();
      this.router.navigate(['signIn/login']);  
      
      if(this.isAuthenticated())
      {
          return this.httpClient.post("https://localhost:44306/api/Account/Logout", httpOptions);
      }
  
    }
  }
