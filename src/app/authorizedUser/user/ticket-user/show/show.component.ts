import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/shared/classes/Ticket';
import { User } from 'src/app/shared/classes/User';
import { TicketUserService } from '../ticket-user.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  ticketsByUser: Array<any>;
  @Input() user:User;
  @Input() ticket:Ticket;
  tickets:Array<any>;
  buttonTicket:boolean;

  constructor(private ticketServer:TicketUserService) { }

  ngOnInit(){
    this.buttonTicket=false;
    this.ticketsByUser=[];
  }

  showTickets()
  {
    this.getTickets();
  }
  hideTickets()
  {
    this.buttonTicket=false;
  }

  getTickets()
  {
      this.ticketServer.getAllTickets().subscribe(
        data=>
        {
            this.tickets=data;
            var i = this.user.Email.split('@')[0];
            this.ticketsByUser=this.tickets.filter((x)=>x.UserId==i);
            if(this.ticketsByUser.length>0)
            {
              this.buttonTicket=true;
              this.ticketsByUser.map((x)=>x.Date=x.Date.replace('T',' ').split('.')[0])
              this.ticketServer.GetTickets.emit(this.ticketsByUser);
            }else
              alert("You haven't bought any tickets")
        }
      )
  }
}
