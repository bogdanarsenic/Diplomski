import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class PricelistService {

  TakeUser=new EventEmitter<User>()
  TakePrice=new EventEmitter<number>();
  TakeIndex=new EventEmitter<number>();

  constructor(private httpClient: HttpClient) { }
  
  getAllPriceLists():any{
    return this.httpClient.get("https://localhost:44306/api/PriceList");
  }

}
