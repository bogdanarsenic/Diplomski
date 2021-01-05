import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
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

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.unapprovedUsers=[];
    this.local="https://localhost:44306/";
    this.folder="Content/images/";
    this.getUsers();
  }

  getUsers(){
    this.userService.getAllUsers()
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
    var index=this.unapprovedUsers.findIndex(x=>x.Email==user.Email);
    this.unapprovedUsers.slice(index,1);
    user.Active = true;
    user.Status="Approved";
    this.userService.putApplicationUsers(user.Id,user)
    .subscribe(
      data =>{
        this.getUsers();
      }
    )
  }

  refuseUser(user){
    user.Active = false;
    user.Status="Denied";
    this.userService.putApplicationUsers(user.Id,user)
    .subscribe(
      data =>{
        this.getUsers();
      }
    )
  }
}
