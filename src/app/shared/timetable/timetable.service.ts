import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeTable } from '../classes/TimeTable';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  url:string="https://localhost:44306/api/Timetable"

  constructor(private httpClient: HttpClient) { }

  getAllTimetables(){
    return this.httpClient.get(this.url);
  }
  
  postTimetable(timetable:TimeTable){
    return this.httpClient.post(this.url, timetable);
  }

  putTimeTable(id:string, timeTiable: TimeTable){
    return this.httpClient.put(this.url+`/${id}`, timeTiable);
  }

  deleteTimeTable(id :string){
      return this.httpClient.delete(this.url+`/${id}`);
  }
}