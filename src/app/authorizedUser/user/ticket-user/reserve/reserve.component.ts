import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { PriceList } from 'src/app/shared/classes/PriceList';
import { Ticket } from 'src/app/shared/classes/Ticket';
import { User } from 'src/app/shared/classes/User';
import { TicketUserService } from '../ticket-user.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
  styles: ['app/shared/lines/map/modal.less'],
})
export class ReserveComponent implements OnInit {

  @Input() pricelist:PriceList[];
  @Input() user:User;
  @Input() tickets:Ticket[];
  priceTemporal:number;
  priceDay:number;
  priceMonth:number;
  priceYear:number;
  price:number[];
  finalPrice:number;
  type:string;
  phoneNumber:string;
  
  constructor(private ticketUserService:TicketUserService, private userService:UserService, private modalService:ModalService) { }

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
        this.finalPrice=price;
        this.type=type;
        this.openModal('custom-modal-3');
  }

  checkPhoneNumber()
  {
      this.userService.getUserByPhoneNumber(this.phoneNumber).subscribe(
        data=>{

          this.modalService.close('custom-modal-3');

          var ticket=new Ticket();
          ticket.IsValid=true;
          ticket.Price=this.finalPrice;
          ticket.TicketType=this.type;
          var id = this.user.Email.split('@')[0];
          ticket.UserId = id;
    
          this.ticketUserService.postTicket(ticket).subscribe(
              x => {
              // alert("You bought a "+type+" ticket for "+price +"RSD");    
                this.ticketUserService.AddTicket.emit(ticket);
                this.phoneNumber="";
                alert("Success!");          
              }
        )

        },
        error=>{
          this.phoneNumber="";
          alert("Phone number is invalid!");
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

  openModal(id: string) {
    this.modalService.open(id);
   }
 
   closeModal(id: string) {
   this.modalService.close(id);
   }
}
