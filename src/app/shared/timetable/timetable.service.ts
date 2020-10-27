import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeTable } from '../classes/TimeTable';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  url:string="http://localhost:52295/api/Timetable"

  AddorEdit= new EventEmitter<TimeTable>();
  Show = new EventEmitter<boolean>();
  SharedTimes=new EventEmitter<string>();


  constructor(private httpClient: HttpClient) { }

  getAllTimetables():any{
    return this.httpClient.get(this.url);
  }


getTimetablebyLineid(lineId:string):Observable<any>
  {
    return this.httpClient.get<any>(this.url+"s/GetTimetablebyLineId",{params:{lineId}});
  }
  
postTimetable(timetable:TimeTable){
    return this.httpClient.post(this.url, timetable);
  }

putTimeTable(id:string, timeTiable: TimeTable): any{
    return this.httpClient.put(this.url+`/${id}`, timeTiable);}

deleteTime(id :string) :any{
      return this.httpClient.delete(this.url+`/${id}`);
    }
}
