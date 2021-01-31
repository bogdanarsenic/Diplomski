import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/classes/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginUserForm:FormGroup;
  login:User;
  id:string;

  constructor(private fb:FormBuilder,private router:Router, private authService:AuthService)

  {
    this.createForm();
   }

   createForm()
   {
    this.loginUserForm=this.fb.group(
      {
        Email: ['',Validators.required],
        Password: ['',Validators.required]
      }
    );
   }

  ngOnInit() {
    localStorage.clear();
    this.login=new User("","");
  }

  onSubmit()
  {
      this.login=this.loginUserForm.value;

      this.authService.getTheToken(this.login).subscribe(
        res=>{

          let jwt=res.access_token;
          localStorage.setItem('jwt',jwt);
          this.authService.setToken(res.expires_in);

          this.router.navigate(['']).then(()=>window.location.reload());

        },error=>
        {
          if(!error.error.error_description)
            alert("Cors is blocking your ip address!");
          else
          alert(error.error.error_description);
        }
      )        
      this.loginUserForm.reset();
    } 
}