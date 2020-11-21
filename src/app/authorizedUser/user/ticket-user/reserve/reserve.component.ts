import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PriceList } from 'src/app/shared/classes/PriceList';
import { Ticket } from 'src/app/shared/classes/Ticket';
import { User } from 'src/app/shared/classes/User';
import { TicketUserService } from '../ticket-user.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  @Input() pricelist:PriceList[];
  @Input() user:User;
  priceTemporal:number;
  priceDay:number;
  priceMonth:number;
  priceYear:number;
  price:number[];
  
  constructor(private ticketUserService:TicketUserService) { }

  ngOnInit(){
    this.price=[]
  }

  Add(i:number)
  {
    switch(i)
    {
      case 0:this.price[i]=this.priceTemporal;
             this.Post(this.price[i],"Temporal");
              break;
      case 1:this.price[i]=this.priceDay;
             this.Post(this.price[i],"Day");
              break;
      case 2:this.price[i]=this.priceMonth;
             this.Post(this.price[i],"Month");
              break;
      case 3:this.price[i]=this.priceYear;
              this.Post(this.price[i],"Year");
              break;
    }

  }

  Post(price:number,type:string)
  {
        var ticket=new Ticket();
        ticket.IsValid=true;
        ticket.Price=price;
        ticket.TicketType=type;
        var id = this.user.Email.split('@')[0];
        ticket.UserId = id;
  
        this.ticketUserService.postTicket(ticket).subscribe(
        data => {
          alert("You bought a "+type+" ticket for "+price +"RSD");                   
        }
      )
  
  }

  GetPriceIndex(price:number,i:number)
  {
      switch(i)
      {
        case 0:this.priceTemporal=price;
              this.price[i]=this.priceTemporal;
                break;
        case 1:this.priceDay=price;
              this.price[i]=this.priceDay;
                break;
        case 2:this.priceMonth=price;
              this.price[i]=this.priceMonth;
                break;
        case 3:this.priceYear=price;
              this.price[i]=this.priceYear;
                break;
      }
  }
}
