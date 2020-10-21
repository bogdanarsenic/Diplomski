import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ServicesService } from '../services/services.service';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private serverService: ServicesService, private router: Router){}

  ngOnInit(){
    this.router.navigate([this.router.url]);
    this.isAdmin();
    this.isController();
  }

  isAdmin()
  {
    if(localStorage.role=="Admin")
         return true;
    else
         return false;
  }

  isController()
  {
    if(localStorage.role=="Controller")
         return true;
    else
        return false;
  }
  public showLogIn(){
    if(!localStorage.jwt)
        return true;
    else
      return false;  
  }

  public showLogOut(){
    
    if(localStorage.jwt)
        return true;
    else
      return false;   
  }

  public callLogout(){
    this.serverService.logOut()
    .subscribe(
      data => {
        localStorage.clear();
        this.router.navigate(['/login']);     
      },
      err => {
        console.log();
      }
    )
  }
}
