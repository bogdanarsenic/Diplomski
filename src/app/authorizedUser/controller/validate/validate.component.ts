import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from 'src/app/sharedComponents/classes/Ticket';
import { TicketUserService } from '../../user/ticket-user/ticket-user.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  id:string;
  ticket:Ticket;
  show:boolean;
  ids:Ticket[];

  constructor(private ticketUserService:TicketUserService) 
  { }

  ngOnInit() {
    this.id="";
    this.ids=[];
    this.ticket=new Ticket();
    this.show=false;
    this.ticketUserService.getAllTickets().subscribe(
      data=>
        {
          this.ids=data;
        }
    )
  }

  Valid(a)
  {
      this.show=false;
      this.id=String(a);

      this.ticketUserService.getTicket(this.id).subscribe(
        data=>
        {
            this.ticket=data;    
            this.ticket.Date=this.ticket.Date.replace('T',' ').split('.')[0];     
            this.show=true;
        },
        error =>
        {
          alert("There is no ticket with this id");
        }
      )
  }
}
