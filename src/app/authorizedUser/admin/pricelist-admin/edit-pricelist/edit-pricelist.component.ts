import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PriceList } from 'src/app/sharedComponents/classes/PriceList';
import { PricelistAdminService } from '../pricelist.service';

@Component({
  selector: 'app-edit-pricelist',
  templateUrl: './edit-pricelist.component.html',
  styleUrls: ['./edit-pricelist.component.css']
})
export class EditPricelistComponent implements OnInit {

  @Input() pricelist:PriceList;
  price:number;
  
  constructor(private priceListService:PricelistAdminService, private router:Router) { }

  ngOnInit(){
    this.price=this.pricelist.Price
  }

  Add(price:number)
  {
    
    switch(this.pricelist.Id)
    {
      case "Temporal":
             this.Edit(price,"Temporal");
              break;
      case "Day":
              this.Edit(price,"Day");
              break;
      case "Month":
             this.Edit(price,"Month");
              break;
      case "Year":
              this.Edit(price,"Year");
              break;
    }

  }

  Edit(price:number,id:string)
  {
      var pricelist=new PriceList();
      pricelist.Price=price;
      pricelist.Id=id;
      this.priceListService.putPriceList(id,pricelist).subscribe(
        data=>
        {
          this.router.navigate(['']).then(()=>window.location.reload()); 
        }
      )
  }

}

