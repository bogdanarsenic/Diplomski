import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { User } from 'src/app/shared/classes/User';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  selectedFile :any;
  localUrl: any[];
  imageShow : any;
  image:any;

  user:User;

  registerUserForm:FormGroup;


  constructor(private fb:FormBuilder,private registerService:ServicesService, private router:Router) 
  { 
    this.createForm();
  }
  createForm()
  {
    this.registerUserForm=this.fb.group({
      ImageUrl:[""],
    })

  }

  ngOnInit() {
    this.registerService.getUser().subscribe(data=>
      {
          this.user=data;
      })
  }

  onFileChanged(event)
  {
    //this.selectedFile = event.target.value;
    this.selectedFile = event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
     this.imageShow = (<FileReader>event.target).result;
      }
  }

  onSubmit()
  {
    if(this.registerUserForm.value.ImageUrl!="")
    {
          this.user.ImageUrl = this.imageShow;

          this.registerService.putApplicationUsers(this.user.Email,this.user).subscribe(
            data=>
            {
              this.router.navigate(['']).then(()=>window.location.reload());
            }
          )     
    }
    else
      alert("You need to upload some image");
  }

}

