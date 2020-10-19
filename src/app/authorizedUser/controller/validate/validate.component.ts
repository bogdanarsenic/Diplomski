import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/classes/Ticket';
import { ServicesService } from 'src/app/services/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  id:string;

  ticket:Ticket;
  show:boolean;

  constructor(private serverService:ServicesService,private router:Router) 
  { 

  }

  ngOnInit(): void {
    this.id="";
    this.ticket=new Ticket();
    this.show=false;
  }

  Valid(a)
  {
      this.show=false;

      this.id=String(a);

      this.serverService.getTicket(this.id).subscribe(
        data=>
        {
            this.ticket=data;
            
            this.show=true;

        }
        ,
        error =>
        {
          alert("There is no ticket with this id");
        }

      )
  }
}
