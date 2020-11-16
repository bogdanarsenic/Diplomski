import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { PriceList } from 'src/app/shared/classes/PriceList';
import { Ticket } from 'src/app/shared/classes/Ticket';


@Injectable({
  providedIn: 'root'
})
export class TicketUserService {

  SendPriceList=new EventEmitter<PriceList[]>();

  constructor(private httpClient:HttpClient)
  { }

  getAllTickets():any{
    return this.httpClient.get("http://localhost:52295/api/Ticket");
  }
  postTicket(t:Ticket):any{
    return this.httpClient.post("http://localhost:52295/api/Ticket", t);
  }
}
