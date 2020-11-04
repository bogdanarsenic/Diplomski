import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PricelistService {

  constructor(private httpClient: HttpClient) { }
  
  getAllPriceLists():any{
    return this.httpClient.get("http://localhost:52295/api/PriceList");
  }

}
