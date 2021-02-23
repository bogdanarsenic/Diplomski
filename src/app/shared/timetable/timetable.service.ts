import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { TimeTable } from '../classes/TimeTable';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  Show = new EventEmitter<boolean>();
  
  constructor(private httpClient: HttpClient) { }
  
  // postTimetable(timetable:TimeTable):any{
  //   return this.httpClient.post("https://localhost:44306/api/Timetable", timetable);
  // }

  putTimeTable(id:string, timetable: TimeTable): any{
    return this.httpClient.put("https://localhost:44306/api/Timetable"+`/${id}`, timetable);
  }

  deleteTime(id :string) :any{
      return this.httpClient.delete("https://localhost:44306/api/Timetable"+`/${id}`);
  }
}
