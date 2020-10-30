import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


  constructor(private httpClient: HttpClient) { }

  getAllLines():any{
    return this.httpClient.get(this.url+"Line");
  }

  getAllStations():any{
    return this.httpClient.get(this.url+"Station");
  }

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

  getAllStationLines():any{
      return this.httpClient.get(this.url+"StationLine");
  }

  deleteLine(id :number) :any{
      return this.httpClient.delete(this.url+`Line/${id}`);
  }
}
