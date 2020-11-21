import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { PriceList } from '../../classes/PriceList';
import { User } from '../../classes/User';
import { PricelistService } from '../pricelist.service';
import { CommonModule } from '@angular/common';
import { TicketUserService } from 'src/app/authorizedUser/user/ticket-user/ticket-user.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  pricelist:PriceList[];
  pricelistTemp:PriceList[]
  user:User;
  disabledStudent:boolean;
  disabledPensioner:boolean;

  constructor(private priceListService:PricelistService, private priceUserService:TicketUserService, private serverService:ServicesService) { }

  ngOnInit(){
    this.getPricelist();
    this.registered();
    this.disabledStudent=false;
    this.disabledPensioner=false;
  }

  registered()
  {
    if(localStorage.jwt)
    {
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

      },
      err => {
        console.log(err);
      }
    ) 
  }

  getUserDetails() : any {
    this.serverService.getUser()
    .subscribe(
            
      data => {
          this.user = data;   
          this.isAdmin(); 
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
    if(this.isUser())
    {  
        this.priceListService.TakePrice.emit(this.pricelist[i].Price);
        this.priceListService.TakeIndex.emit(i);
      }  
  }

  onStudent(i:number)
  {
    this.pricelist[i].Price=this.pricelistTemp[i].Price
    this.pricelist[i].Price=Math.round(this.pricelist[i].Price*0.8)
    if(this.isUser())
    {  
        this.priceListService.TakePrice.emit(this.pricelist[i].Price);
        this.priceListService.TakeIndex.emit(i);
      }  

  }
  onPensioner(i:number)
  {
    this.pricelist[i].Price=this.pricelistTemp[i].Price
    this.pricelist[i].Price=Math.round(this.pricelist[i].Price*0.7)
    if(this.isUser())
    {  
        this.priceListService.TakePrice.emit(this.pricelist[i].Price);
        this.priceListService.TakeIndex.emit(i);
      }  
  }

  isUser()
  {
    return localStorage.role=="AppUser"? true:false 
  }

  isAdmin()
  {
      return localStorage.role=="Admin"? true:false          
  }

  isDisabledStudent()
  {
      if(localStorage.role=="AppUser")
        {
            if(this.user.Type=="Student" && this.user.Active==true)
              return this.disabledStudent=false;
            return this.disabledStudent=true;
        }
          return  this.disabledStudent=false;
  }
  isDisabledPensioner()
  {
    if(localStorage.role=="AppUser")
    {
        if(this.user.Type=="Pensioner" && this.user.Active==true)
          return this.disabledPensioner=false;
        return this.disabledPensioner=true;
    }
        return this.disabledPensioner=false;
  }
}
