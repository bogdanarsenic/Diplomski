import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { Login } from 'src/app/shared/classes/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ServicesService]
})
export class LoginComponent implements OnInit {

  loginUserForm:FormGroup;
  login:Login;
  id:string;

  constructor(private fb:FormBuilder,private router:Router, private loginService:ServicesService, private serverService:ServicesService)

  {
    this.createForm();
   }

   createForm()
   {
    this.loginUserForm=this.fb.group(
      {
        Username: ['',Validators.required],
        Password: ['',Validators.required]
      }
    );
   }

  ngOnInit() {
    localStorage.clear();
    this.login=new Login("","");
  }

  onSubmit()
  {
      this.login=this.loginUserForm.value;

      this.loginService.getTheToken(this.login).subscribe(
        res=>{

  
          let jwt=res.access_token;
          let jwtData=jwt.split('.')[1]
          let decodedJwtJsonData=window.atob(jwtData)
          let decodedJwtData=JSON.parse(decodedJwtJsonData)

          let role=decodedJwtData.role
          var tokenExpires=new Date();
          tokenExpires.setSeconds(tokenExpires.getSeconds() + res.expires_in);
          this.serverService.autoLogout(res.expires_in*1000);

          localStorage.setItem('jwt',jwt);
          localStorage.setItem('role',role);
          localStorage.setItem('tokenExpiresOn',tokenExpires.toString());

          this.router.navigate(['']);

        },error=>
        {
          alert("Invalid Username or Password!")
          console.log(error);
        }
      )        
      this.loginUserForm.reset();
    } 
}