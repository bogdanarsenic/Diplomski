import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  role:string;
  tokenExpirationTimer:any;

  constructor(private authService:AuthService){}

  ngOnInit(){

    if(localStorage.jwt)
    {
      this.role=this.authService.getRole();
      this.checkToken();
    }
    else{
      this.role="";
    }
  }

  checkToken()
  {
    var expiredDate=new Date(localStorage.getItem('tokenExpiresOn'));
    var now=new Date();

    if(now>expiredDate)
    {
      alert("Your token expired!");
      this.authService.logOut();
    }
    else
    {
        var tokenExpiresOn=expiredDate.getTime()-now.getTime();
        this.authService.autoLogout(tokenExpiresOn);
    }
    
  }
  
  showLogIn(){
    return localStorage.jwt ? false:true  
  }

  callLogout(){
    this.authService.logOut();
    }
}
