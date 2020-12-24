import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private serverService: ServicesService){}

  ngOnInit(){
    
  }

  isAdmin()
  {
    return localStorage.role=="Admin"? true : false
  }

  isController()
  { 
    return localStorage.role=="Controller"? true : false
  }

  isUser()
  {
    return localStorage.role=="AppUser"? true : false
  }
  
  public showLogIn(){
    return localStorage.jwt ? false:true  
  }

  public callLogout(){
    this.serverService.logOut();
  }
}
