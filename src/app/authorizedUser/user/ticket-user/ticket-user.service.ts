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
  GetTickets=new EventEmitter<Ticket[]>();
  AddTicket=new EventEmitter<Ticket>();

  constructor(private httpClient:HttpClient)
  { }

  getAllTickets():any{
    return this.httpClient.get("https://localhost:44306/api/Ticket");
  }
  postTicket(t:Ticket):any{
    return this.httpClient.post("https://localhost:44306/api/Ticket", t);
  }

  getTicket(id:string): any{
    return this.httpClient.get('https://localhost:44306/api/Ticket',{params:{id}});
  }
}
