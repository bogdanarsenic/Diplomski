import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
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
  timetablesTemp:TimeTable[]
  days: Array<string> = ["Weekday", "Saturday", "Sunday"];
  day:string;
  suburban:boolean;
  city : boolean;
  showTT:boolean;
  line:string;
  lines:Line[];

  constructor(private serverService:TimetableService,private lineService:LinesService,private router:Router) 
  {
  }

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
    this.serverService.getAllTimetables().subscribe(
      data=>
      {
          this.timetables=data;
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
      lines.forEach(x=>{
    
        if((Number)(x.Name)<30)
        {
            if(this.cityLines.findIndex(y=>x.Name==y.LineId)!=0)
            {
                this.cityLines.push(x);
                this.cityLines.sort((function(a, b){return a-b}));   
            }
        }
      else
        {     
          if(this.subLines.findIndex(y=>x.Name==y.LineId)!=0)
          {
              this.subLines.push(x);
              this.subLines.sort((function(a, b){return a-b}));
          }
        }
    })
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
    var t;
    t=this.timetables.findIndex(item=>item.Day==this.day && item.LineId==this.line)
    this.timetablesTemp=this.timetables.map((x)=>{ return {...x}})

    if(t!=-1) 
        {
          this.timetable=this.timetablesTemp[t]
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
        this.serverService.Show.emit(this.showTT);
        this.serverService.AddorEdit.emit(this.timetable);
      }
      else
      {
        this.serverService.Show.emit(this.showTT);
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
