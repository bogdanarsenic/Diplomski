import { Component, OnInit, ViewChild } from '@angular/core';
import { PriceList } from 'src/app/shared/classes/PriceList';
import { User } from 'src/app/shared/classes/User';
import { PricelistService } from 'src/app/shared/pricelist/pricelist.service';
import { PaypalComponent } from './paypal/paypal.component';
import { ReserveComponent } from './reserve/reserve.component';
import { TicketUserService } from './ticket-user.service';

@Component({
  selector: 'app-ticket-user',
  templateUrl: './ticket-user.component.html',
  styleUrls: ['./ticket-user.component.css']
})
export class TicketUserComponent implements OnInit {

  @ViewChild(PaypalComponent,{static:false})childPaypal:PaypalComponent
  @ViewChild(ReserveComponent,{static:false})childReserve:ReserveComponent

  user:User;
  price:number;
  index:number;
  pricelist:PriceList[];
  canBuy:boolean;

  constructor(private priceListService:PricelistService, private priceUserService:TicketUserService)
   { }

  ngOnInit()
  {
      this.canBuy=false;
      this.TakeUser();
      this.TakePrice();
      this.TakeIndex();
      this.TakePricelist();
  }

  TakeUser()
  {
    this.priceListService.TakeUser.subscribe(
      data=>
      {
        this.user=data;
        this.CheckUser(this.user);
      }
    )
  }

  CheckUser(user:User)
  {
      if(user.Status=="Approved" && user.Active==true)
      {
          if(user.Type=="Regular")
            return this.canBuy=true;

          else if (user.ImageUrl!=null && user.ImageUrl!=undefined && user.ImageUrl!="")
            return this.canBuy=true;
      }
      return this.canBuy=false;
  }

  TakePricelist()
  {
    this.priceUserService.SendPriceList.subscribe(
      data=>
      {
        this.pricelist=data;
      }
    )
  }
  
  TakePrice()
  {
    this.priceListService.TakePrice.subscribe(
      data=>
      {
        this.price=data;
      }
    )
  }

  TakeIndex()
  {
    this.priceListService.TakeIndex.subscribe(
      data=>
      {
            this.index=data;
            if(this.canBuy==true)
            {
                this.childPaypal.GetPriceIndex(this.price,this.index);
                this.childReserve.GetPriceIndex(this.price,this.index);                         
             }
      }
    )
  }

}
