import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceList } from 'src/app/sharedComponents/classes/PriceList';

@Injectable({
  providedIn: 'root'
})
export class PricelistAdminService {

  constructor(private httpClient:HttpClient) { }

  putPriceList(id:string,pricelist:PriceList): Observable<any>{
    return this.httpClient.put(`http://localhost:52295/api/PriceList/${id}`, pricelist );
  }
}
