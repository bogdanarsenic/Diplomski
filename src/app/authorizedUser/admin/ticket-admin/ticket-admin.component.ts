import { Component, OnInit, ViewChild } from '@angular/core';
import { PriceList } from 'src/app/shared/classes/PriceList';
import { TicketUserService } from '../../user/ticket-user/ticket-user.service';

@Component({
  selector: 'app-ticket-admin',
  templateUrl: './ticket-admin.component.html',
  styleUrls: ['./ticket-admin.component.css']
})
export class TicketAdminComponent implements OnInit {

  pricelist:PriceList[];

  constructor(private priceUserService:TicketUserService)
   { }

  ngOnInit()
  {
      this.TakePricelist();
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
}
