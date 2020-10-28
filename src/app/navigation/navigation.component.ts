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
    return localStorage.role=="Admin"? true : false
  }

  isController()
  { 
    return localStorage.role=="Controller"? true : false
  }
  
  public showLogIn(){
    return localStorage.jwt ? false:true  
  }

  public showLogOut(){   
    return localStorage.jwt ? true:false  
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
