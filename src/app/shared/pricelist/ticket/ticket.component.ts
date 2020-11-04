import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { PriceList } from '../../classes/PriceList';
import { User } from '../../classes/User';
import { PricelistService } from '../pricelist.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  pricelist:PriceList[];
  pricelistTemp:PriceList[]
  user:User;

  studentCoefficient:number=0.8
  pensionerCoefficient:number=0.7

  constructor(private priceListService:PricelistService, private serverService:ServicesService) { }

  ngOnInit(){
    this.getPricelist();
    this.getUserDetails();
  }

  getPricelist() {

    this.priceListService.getAllPriceLists()
    .subscribe(   
      data => {    
          this.pricelist=data;   
          this.pricelist.sort((a,b)=>a.Price-b.Price);
          this.pricelistTemp=this.pricelist.map((x)=>{return {...x}})   

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
        
      },
      err => {
        console.log(err);
      }
      
    ) 
    
  }

  onRegular(i:number)
  {
    this.pricelist[i].Price=this.pricelistTemp[i].Price
    this.pricelist[i].Price=this.pricelist[i].Price
  }

  onStudent(i:number)
  {
    this.pricelist[i].Price=this.pricelistTemp[i].Price
    this.pricelist[i].Price=this.pricelist[i].Price*this.studentCoefficient

  }
  onPensioner(i:number)
  {
    this.pricelist[i].Price=this.pricelistTemp[i].Price
    this.pricelist[i].Price=this.pricelist[i].Price*this.pensionerCoefficient
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
              return false;
            return true;
        }
          return false;
  }
  isDisabledPensioner()
  {
    if(localStorage.role=="AppUser")
    {
        if(this.user.Type=="Pensioner" && this.user.Active==true)
          return false;
        return true;
    }
      return false;
  }
}
