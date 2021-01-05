import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/classes/User';
import { Login } from 'src/app/shared/classes/Login';
import { CustomValidators } from 'src/app/shared/validator/customValidator';
import { MatchPassword } from 'src/app/shared/validator/MatchPassword';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent {

  registerUserForm:FormGroup;
  user:User;
  validationMessage:string="";
  errors: any[] = [];
  
  constructor (private fb:FormBuilder,private authService:AuthService, private userService:UserService, private router:Router){
    this.createForm();
  }

  createForm()
  {
    this.registerUserForm=this.fb.group({
      Name: ["",[Validators.required]],
      LastName:['',Validators.required],
      DateOfBirth:['',Validators.required],
      Email:["", [Validators.email, Validators.required]],
      Address:['',Validators.required],
      Password:["",[
        Validators.required,CustomValidators.patternValidator(/\d/, {hasNumber: true}),
        CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,{hasSpecialCharacters: true}),
        Validators.minLength(8)
      ]],
      ConfirmPassword:["",[Validators.required]],
      Type:["", [Validators.required]]
    },
    {
      validator:MatchPassword.MatchPassword
    });

  }

  onSubmit()
  {
    if(this.registerUserForm !=null)
    {
      this.user = new User;
      this.user.Name = this.registerUserForm.value.Name;
      this.user.LastName = this.registerUserForm.value.LastName;
      this.user.Email = this.registerUserForm.value.Email;
      this.user.Address = this.registerUserForm.value.Address;
      this.user.Password = this.registerUserForm.value.Password;
      this.user.ConfirmPassword = this.registerUserForm.value.ConfirmPassword;
      this.user.DateOfBirth = this.registerUserForm.value.DateOfBirth;
      this.user.Type = this.registerUserForm.value.Type;
      this.user.Status="InProgress";

      this.Registrate(this.user);
    }
  }

  get f() { return this.registerUserForm.controls; }

  Registrate(user:User)
    {
    this.userService.RegistrationGuest(user).subscribe(
      data=>{

        this.authService.getTheToken(new Login(user.Email,user.Password))
          .subscribe(
            res=>
            {

                let jwt=res.access_token;
                localStorage.setItem('jwt', jwt);
                this.authService.setToken(res.expires_in);
 
                this.router.navigate(['']).then(()=>window.location.reload());
                
            },err => {
              this.validationMessage = err.error.error_description;
                      console.log(err);
            }
          )
    },
    error =>
    {
        console.log(error);
        for(var key in error.error.ModelState){
          for (var i = 0; i < error.error.ModelState[key].length; i++) {
            this.errors.push(error.error.ModelState[key][i]);
          }
        }
    }
  
    )
    this.registerUserForm.reset();
  }
}



