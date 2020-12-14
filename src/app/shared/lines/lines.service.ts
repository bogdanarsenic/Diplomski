import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Line } from '../classes/Line';
import { Station } from '../classes/Station';
import { StationLine } from '../classes/StationLine';

@Injectable({
  providedIn: 'root'
})
export class LinesService {

  url:string="http://localhost:52295/api/"

  TakeSelectedLine=new EventEmitter<string>();
  TakeLines=new EventEmitter<Line[]>();
  TakeStationLines=new EventEmitter<StationLine[]>();
  TakeStations=new EventEmitter<Station[]>();
  DrawedStations=new EventEmitter<Station[]>();
  VehiclePosition=new EventEmitter<Station>();
  isVehicle=new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) { }

  getAllLines():any{
    return this.httpClient.get(this.url+"Line");
  }

  getAllStations():any{
    return this.httpClient.get(this.url+"Station");
  }

  getAllStationLines():any{
      return this.httpClient.get(this.url+"StationLine");
  }

}
