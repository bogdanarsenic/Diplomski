import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { TimeTable } from '../classes/TimeTable';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  url:string="https://localhost:44306/api/Timetable"

  Show = new EventEmitter<boolean>();
  
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