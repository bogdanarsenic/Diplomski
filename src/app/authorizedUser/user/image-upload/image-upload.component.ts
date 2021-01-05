import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/classes/User';
import { ImageService } from './image.service';

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

  constructor(private fb:FormBuilder,private userService:UserService, private router:Router, private imageService:ImageService) 
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
    this.userService.getUser().subscribe(data=>
      {
          this.user=data;
      })
  }

  onFileChanged(event)
  {
    this.selectedFile = event.target.files[0]

    let typeOfFile=this.selectedFile.type.split('/');

    if (typeOfFile[0] == "image" && (typeOfFile[1] == "jpg" || typeOfFile[1] == "jpeg" || typeOfFile[1] == "png") && this.selectedFile.size < 512000)
        { 
          this.image=this.selectedFile.name;
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event) => {
          this.imageShow = (<FileReader>event.target).result;
        }
      }
      else
      {
        alert("Invalid! Valid formats - jpg,jpeg,png with size lower than 512kb");
        return;
      }
    }  


  onSubmit()
  {

    const fd=new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name)

    this.imageService.AddingImage(fd).subscribe(data=>{

      this.user.ImageUrl = this.image;

      this.userService.putApplicationUsers(this.user.Email,this.user).subscribe(
        data=>
        {
          this.router.navigate(['']).then(()=>window.location.reload());
        }
      ) 

    },error=>{
      alert("File invalid!");
    });
 
  }

}

