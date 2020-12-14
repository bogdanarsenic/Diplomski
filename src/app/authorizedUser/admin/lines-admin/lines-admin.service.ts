import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Line } from 'src/app/shared/classes/Line';
import { Station } from 'src/app/shared/classes/Station';
import { StationLine } from 'src/app/shared/classes/StationLine';
import { GeoLocation } from 'src/app/shared/lines/map/model/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LinesAdminService {

  url:string="http://localhost:52295/api/"

  constructor(private httpClient: HttpClient) { }

  TakeLineId=new EventEmitter<number>();
  TakePolyline=new EventEmitter<boolean>();
  GetStation=new EventEmitter<Station>();
  SendAddressLocation=new EventEmitter<GeoLocation>();

  postLine(Line:Line):Observable<any>{
    return this.httpClient.post(this.url+"Line", Line);
  }

  postStation(station:Station):Observable<any>{
    return this.httpClient.post(this.url+"Station", station);
  }

  postStationLine(stationLine:StationLine){
    return this.httpClient.post(this.url+"StationLine", stationLine);
  }

  putLine(LineId : number, line: Line): Observable<any>{
      return this.httpClient.put(this.url+`Line/${LineId}`, line );
  }

  putStation(StationId : number, station: Station): Observable<any>{
      return this.httpClient.put(this.url+`Station/${StationId}`, station );
  }

  deleteStation(id :number) :any{
      return this.httpClient.delete(this.url+`Station/${id}`);
  }

  deleteLine(id :number) :any{
      return this.httpClient.delete(this.url+`Line/${id}`);
  }
}
