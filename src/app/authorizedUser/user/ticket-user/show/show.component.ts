import { Component, Input, OnInit } from '@angular/core';
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
            }else
              alert("You haven't bought any tickets")
        }
      )
  }
}
