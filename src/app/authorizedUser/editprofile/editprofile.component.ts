import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { User } from 'src/app/shared/classes/User';
import { CustomValidators } from 'src/app/shared/validator/customValidator';
import { MatchPassword } from 'src/app/shared/validator/MatchPassword';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  providers:[UserService],
})
export class EditprofileComponent implements OnInit {

  korisnik:User;
  user:User=new User();
  registerUserForm:FormGroup;
  id:string;
  isRegular:boolean;
  imageUrl:string;

  status:string;

  constructor(private userService:UserService,private router:Router,private fb:FormBuilder) {
      this.createForm();
   }

   createForm()
  {
    this.registerUserForm=this.fb.group({
      Name: ["",[Validators.required,]],
      LastName:['',Validators.required],
      DateOfBirth:['',Validators.required],
      Email:["", [Validators.email, Validators.required]],
      Address:['',Validators.required],
      PhoneNumber:["",[Validators.required, Validators.maxLength(12), Validators.minLength(7)]],
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
  ngOnInit() {

    this.isRegular=true;
    this.status="";
    this.getUser();

  }

  getUser():any{
      this.userService.getUser().subscribe(
      data=>{

          this.user=data;
          this.registerUserForm.value.Email=this.user.Email;
          this.registerUserForm.value.Password=this.user.Password;
          this.registerUserForm.value.Name=this.user.Name;
          this.registerUserForm.value.Surname=this.user.LastName;
          this.registerUserForm.value.Address=this.user.Address;
          this.registerUserForm.value.DateOfBirth=this.user.DateOfBirth;
          this.registerUserForm.value.ConfirmPassword=this.user.ConfirmPassword;
          this.registerUserForm.value.PhoneNumber=this.user.PhoneNumber;
          this.registerUserForm.value.Type=this.user.Type;
          this.imageUrl=this.user.ImageUrl;
          this.status=this.user.Status;
          if(this.user.Type!="Regular")
          {
            this.isRegular=false;
          }
      })
  }

  get f() { return this.registerUserForm.controls; }

  onSubmit()
  {
      this.Update(this.user)
  }

  Update(user:User)
  {

    this.user.Name = this.registerUserForm.value.Name;
    this.user.LastName = this.registerUserForm.value.LastName
    this.user.Email = this.registerUserForm.value.Email;
    this.user.Address = this.registerUserForm.value.Address;
    this.user.Password = this.registerUserForm.value.Password;
    this.user.ConfirmPassword = this.registerUserForm.value.ConfirmPassword;
    this.user.DateOfBirth = this.registerUserForm.value.DateOfBirth;

    if(this.user.Type!=null)
    {
       this.user.Type = this.registerUserForm.value.Type;
       this.user.PhoneNumber=this.registerUserForm.value.PhoneNumber;
    }

    
    var u = this.user;
    u.Name = this.user.Name+'|'+this.user.Password;
    this.id = this.user.Email.split('@')[0];

    this.userService.putApplicationUsers(this.id,u).subscribe(
      data=>{
                this.router.navigate(['']);           
            }
          )  
  }
}