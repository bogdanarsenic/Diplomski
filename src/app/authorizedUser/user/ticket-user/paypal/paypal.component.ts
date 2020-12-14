import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Ticket } from 'src/app/shared/classes/Ticket';
import { User } from 'src/app/shared/classes/User';
import { TicketUserService } from '../ticket-user.service';

declare var paypal;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement:ElementRef;

  paypalchecked:boolean;
  ticket:Ticket
  priceYear:number;
  priceTemporal:number;
  priceMonth:number;
  priceDay:number;
  paypalPrice:number;
  price:number
  index:number
  @Input() user:User

  constructor(private ticketUserService:TicketUserService) { }

  ngOnInit() {
    this.paypalchecked=false;
    this.ticket=new Ticket();
  }

  onPayPal()
  {
    paypal
      .Buttons({
        style: {
          size: 'small',
          color: 'gold',
          shape: 'pill',
          label: 'checkout',
         },
        createOrder: (data, actions) => {
          return actions.order.create({

            purchase_units: [                  
              {                
                amount: {
                  value: this.paypalPrice/100,
                  currency_code: 'USD'
                }
              }
            ]
          
          });
        },

        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          var id = this.user.Email.split('@')[0];
          this.ticket.UserId = id;
          this.ticket.IsValid = true;
          this.ticket.OrderID = data.orderID;
          this.ticket.PayerID = data.payerID;
          this.ticketUserService.postTicket(this.ticket)
        .subscribe(
          data => {
            this.ticketUserService.AddTicket.emit(this.ticket);          
          }
        )
        }
      })      
      .render(this.paypalElement.nativeElement);
  }

  GetPriceIndex(price:number,i:number)
  {
      switch(i)
      {
        case 0:this.priceTemporal=price;
                break;
        case 1:this.priceDay=price;
                break;
        case 2:this.priceMonth=price;
                break;
        case 3:this.priceYear=price;
                break;
      }
  }

  paypalHour()
  {
      if(!this.paypalchecked)
        {
          this.ticket.TicketType="Temporal";
          this.ticket.Price=this.priceTemporal;
          this.paypalPrice=this.priceTemporal;
          this.paypalchecked=true;
          this.onPayPal();
        }      
  }

  paypalDay()
  {
      if(!this.paypalchecked)
        {
          this.ticket.TicketType="Day";
          this.ticket.Price=this.priceDay;
          this.paypalPrice=this.priceDay;
          this.paypalchecked=true;
          this.onPayPal();
        }  
  }

  paypalMonth()
  {
    if(!this.paypalchecked)
        {
          this.ticket.TicketType="Month";
          this.ticket.Price=this.priceMonth;
          this.paypalPrice=this.priceMonth;
          this.paypalchecked=true;
          this.onPayPal();
        }  
  }

  paypalYear()
  {
      if(!this.paypalchecked)
        {
          this.ticket.TicketType="Year";
          this.ticket.Price=this.priceYear;
          this.paypalPrice=this.priceYear;
          this.paypalchecked=true;
          this.onPayPal();
        }  
  }
}
