import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TicketUserService } from 'src/app/authorizedUser/user/ticket-user/ticket-user.service';
import { UserService } from 'src/app/services/user.service';
import { PriceList } from '../classes/PriceList';
import { User } from '../classes/User';
import { PricelistService } from './pricelist.service';


@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  pricelist:PriceList[];
  pricelistTemp:PriceList[]
  user:User;
  disabledStudent:boolean;
  disabledPensioner:boolean;
  role:string;

  constructor(private priceListService:PricelistService, private priceUserService:TicketUserService, private authService:AuthService, private userService:UserService) { }

  ngOnInit(){

    this.role='';
    this.getPricelist();
    this.registered();
    this.disabledStudent=false;
    this.disabledPensioner=false;
  }

  registered()
  {
    if(localStorage.jwt)
    {
      this.role=this.authService.getRole();
      this.getUserDetails();
    }
  }
  getPricelist() {

    this.priceListService.getAllPriceLists()
    .subscribe(   
      data => {    
          this.pricelist=data;   
          this.pricelist.sort((a,b)=>a.Price-b.Price);
          this.pricelistTemp=this.pricelist.map((x)=>{return {...x}}) 
          this.priceUserService.SendPriceList.emit(this.pricelistTemp);  
      }
    ) 
  }

  getUserDetails() : any {
    this.userService.getUser()
    .subscribe(
            
      data => {
          this.user = data;   

          this.isDisabledPensioner();
          this.isDisabledStudent();       
          this.priceListService.TakeUser.emit(this.user);
      }
    ) 
    
  }

  onRegular(i:number)
  {
    this.pricelist[i].Price=this.pricelistTemp[i].Price
    this.pricelist[i].Price=this.pricelist[i].Price
    if(this.role=="AppUser")
    {  
        this.priceListService.TakePrice.emit(this.pricelist[i].Price);
        this.priceListService.TakeIndex.emit(i);
      }  
  }

  onStudent(i:number)
  {
    this.pricelist[i].Price=this.pricelistTemp[i].Price
    this.pricelist[i].Price=Math.round(this.pricelist[i].Price*0.8)
    if(this.role=="AppUser")
    {  
        this.priceListService.TakePrice.emit(this.pricelist[i].Price);
        this.priceListService.TakeIndex.emit(i);
      }  

  }
  onPensioner(i:number)
  {
    this.pricelist[i].Price=this.pricelistTemp[i].Price
    this.pricelist[i].Price=Math.round(this.pricelist[i].Price*0.7)
    if(this.role=="AppUser")
    {  
        this.priceListService.TakePrice.emit(this.pricelist[i].Price);
        this.priceListService.TakeIndex.emit(i);
      }  
  }

  isDisabledStudent()
  {
      if(this.role=="AppUser")
        {
            if(this.user.Type=="Student" && this.user.Active==true)
              return this.disabledStudent=false;
            return this.disabledStudent=true;
        }
          return  this.disabledStudent=false;
  }
  isDisabledPensioner()
  {
    if(this.role=="AppUser")
    {
        if(this.user.Type=="Pensioner" && this.user.Active==true)
          return this.disabledPensioner=false;
        return this.disabledPensioner=true;
    }
        return this.disabledPensioner=false;
  }
}
