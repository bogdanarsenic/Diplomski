import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceList } from 'src/app/shared/classes/PriceList';

@Injectable({
  providedIn: 'root'
})
export class PricelistAdminService {

  constructor(private httpClient:HttpClient) { }

  putPriceList(id:string,pricelist:PriceList): Observable<any>{
    return this.httpClient.put(`https://localhost:44306/api/PriceList/${id}`, pricelist );
  }
}
