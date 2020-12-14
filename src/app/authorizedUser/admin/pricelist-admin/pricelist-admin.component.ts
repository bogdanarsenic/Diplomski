import { Component, OnInit } from '@angular/core';
import { PriceList } from 'src/app/shared/classes/PriceList';
import { TicketUserService } from '../../user/ticket-user/ticket-user.service';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-pricelist-admin',
  templateUrl: './pricelist-admin.component.html',
  styleUrls: ['./pricelist-admin.component.css']
})
export class PricelistAdminComponent implements OnInit {

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
