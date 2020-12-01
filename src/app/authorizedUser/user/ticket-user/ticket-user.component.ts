import { Component, OnInit, ViewChild } from '@angular/core';
import { PriceList } from 'src/app/sharedComponents/classes/PriceList';
import { Ticket } from 'src/app/sharedComponents/classes/Ticket';
import { User } from 'src/app/sharedComponents/classes/User';
import { PricelistService } from 'src/app/sharedComponents/pricelist/pricelist.service';
import { PaypalComponent } from './paypal/paypal.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ShowComponent } from './show/show.component';
import { TicketUserService } from './ticket-user.service';

@Component({
  selector: 'app-ticket-user',
  templateUrl: './ticket-user.component.html',
  styleUrls: ['./ticket-user.component.css']
})
export class TicketUserComponent implements OnInit {

  @ViewChild(PaypalComponent,{static:false})childPaypal:PaypalComponent
  @ViewChild(ReserveComponent,{static:false})childReserve:ReserveComponent
  @ViewChild(ShowComponent,{static:false})childShow:ShowComponent

  user:User;
  price:number;
  index:number;
  pricelist:PriceList[];
  canBuy:boolean;
  tickets:Ticket[];
  ticket:Ticket;

  constructor(private priceListService:PricelistService, private priceUserService:TicketUserService)
   { }

  ngOnInit()
  {
      this.canBuy=false;
      this.TakeUser();
      this.TakePrice();
      this.TakeIndex();
      this.TakePricelist();
      this.AddNewTicket();
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

  GetTickets()
  {
    this.priceUserService.GetTickets.subscribe(
      data=>
      {
        this.tickets=data;
      }
    )
  }

  AddNewTicket()
  {
    this.priceUserService.AddTicket.subscribe(
      data=>
      {
        this.ticket=data;
        this.childShow.getTickets();
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
