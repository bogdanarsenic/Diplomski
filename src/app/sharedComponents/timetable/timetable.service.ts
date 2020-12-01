import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { TimeTable } from '../classes/TimeTable';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  url:string="http://localhost:52295/api/Timetable"

  AddorEdit= new EventEmitter<TimeTable>();
  Show = new EventEmitter<boolean>();
  sharedComponentsTimes=new EventEmitter<string>();
  GetTimetables=new EventEmitter<TimeTable[]>();
  SendNew=new EventEmitter<TimeTable[]>();

  constructor(private httpClient: HttpClient) { }

  getAllTimetables():any{
    return this.httpClient.get(this.url);
  }
  
  postTimetable(timetable:TimeTable):any{
    return this.httpClient.post(this.url, timetable);
  }

  putTimeTable(id:string, timeTiable: TimeTable): any{
    return this.httpClient.put(this.url+`/${id}`, timeTiable);
  }

  deleteTime(id :string) :any{
      return this.httpClient.delete(this.url+`/${id}`);
  }
}
