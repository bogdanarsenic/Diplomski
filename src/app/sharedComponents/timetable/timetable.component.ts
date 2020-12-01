import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTable } from '../classes/TimeTable';
import { TimetableService } from './timetable.service';
import { Line } from '../classes/Line';
import { LinesService } from '../lines/lines.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  cityLines: any[]
  subLines:any[]
  timetables:TimeTable []
  timetable:TimeTable
  days: Array<string> = ["Weekday", "Saturday", "Sunday"];
  day:string;
  suburban:boolean;
  city : boolean;
  showTT:boolean;
  line:string;
  lines:Line[];

  constructor(private timetableService:TimetableService,private lineService:LinesService) 
  {}

  ngOnInit(){

    this.callGetTimetables();
    this.callGetLines();
    this.timetables=[];
    this.timetable=new TimeTable();
    this.city=false;
    this.suburban=false;
    this.showTT=false;
    this.day="Weekday";
    this.cityLines=[];
    this.subLines=[];
  }

  onCity()
  {
      this.city=true;
      this.suburban=false;
      this.AfterCityorSuburban();
  }

  onSuburban()
  {
    this.city=false;
    this.suburban=true;
    this.AfterCityorSuburban();
  }

  AfterCityorSuburban()
  {
    this.showTT=false;
    this.line="";
    this.timetable.Id="";
    this.checkEmit()
  }

  callGetTimetables()
  {
    this.timetableService.getAllTimetables().subscribe(
      data=>
      {
          this.timetables=data;
          this.timetableService.GetTimetables.emit(this.timetables);
      }
  )
  }

  callGetLines()
  {
    this.lineService.getAllLines().subscribe(
      data=>
      {
        this.lines=data;
        this.subOrCity(this.lines);
      }      
    )
  }

  subOrCity(lines:Line[])
  {
      this.cityLines=lines.filter(x=>(Number)(x.Name)<30);
      this.cityLines.sort((x,y)=>{return x.Name-y.Name});  
      this.subLines=lines.filter(x=>(Number)(x.Name)>30);
      this.subLines.sort((x,y)=>{return x.Name-y.Name});
  }

  onItemChange(line)
  { 
    this.showTT=false;
      if(line!="")
      {
        this.line=line;
        this.findTimeForTimetable();
      }
  }

  checkDay(day)
  {
      this.showTT=false;
      this.day=day;
      this.findTimeForTimetable();
  }

  findTimeForTimetable()
  {
    var t=this.timetables.findIndex(item=>item.Day==this.day && item.LineId==this.line)
    var timetablesTemp=this.timetables.map((x)=>{ return {...x}})

    if(t!=-1) 
        {
          this.timetable=timetablesTemp[t]
          if(this.isAdmin())
              this.checkEmit()
        }
    else
    { 
        this.timetable.Id="";
        if(this.isAdmin()) 
        {
          this.timetable.Day=this.day;
          this.timetable.LineId=this.line;
          this.timetable.Type=(Number(this.line)>30)?"Suburban":"City"  
          this.checkEmit();
        } 
    }
  }

  checkEmit()
  {
      if(this.line!="")
      {
        this.showTT=true;
        this.timetableService.Show.emit(this.showTT);
        this.timetableService.AddorEdit.emit(this.timetable);
      }
      else
      {
        this.timetableService.Show.emit(this.showTT);
      }
  }

  Show()
  {
      if(this.timetable.Id=="" || this.timetable.Id==undefined)
      {
        alert("There is no timetable for this day and line yet")
        this.showTT=false;
      }
      else
      {    
        this.showTT=true;
      }
  }

  isAdmin()
  {
   return localStorage.getItem('role')=="Admin"? true : false
  }
}
