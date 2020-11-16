import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/shared/classes/User';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  unapprovedUsers:Array<User> = [];
  local:string
  folder:string

  constructor(private serverService: ServicesService, private router: Router) { }
  
  ngOnInit() {
    this.unapprovedUsers=[];
    this.local="http://localhost:52295/";
    this.folder="Content/";
    this.getUsers();
  }

  getUsers(){
    this.serverService.getAllUsers()
    .subscribe(
      data => {      
        this.unapprovedUsers=data.filter((x)=>!x.Active && x.Status=="InProgress");
        this.unapprovedUsers.forEach(
          x=>
            {
              if(x.ImageUrl!=null && x.ImageUrl!="")
                  x.ImageUrl=this.local+this.folder+x.ImageUrl;
            }
        )
      }
    )
  }

  approveUser(user){
    user.Active = true;
    user.Status="Approved";
    this.serverService.putApplicationUsers(user.Id,user)
    .subscribe(
      data =>{
        this.router.navigate(['']).then(()=>window.location.reload());
      }
    )
  }

  refuseUser(user){
    user.Active = false;
    user.Status="Denied";
    this.serverService.putApplicationUsers(user.Id,user)
    .subscribe(
      data =>{
        this.router.navigate(['']).then(()=>window.location.reload());
      }
    )
  }
}
