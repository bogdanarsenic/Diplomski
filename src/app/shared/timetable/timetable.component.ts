import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TimeTable } from '../classes/TimeTable';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  cityLines: any[]
  subLines:any[]
  times:string;
  timetables:TimeTable []
  days: Array<string> = ["Weekday", "Saturday", "Sunday"];
  day:string;
  suburban:boolean;
  city : boolean;
  showTT:boolean;
  hours:string[];
  minutes:string[];
  line:string;

  constructor(private serverService:ServicesService,private router:Router) 
  {
  }


  ngOnInit(){

    this.callGetTimetables();
    this.timetables=[];
    this.city=false;
    this.suburban=false;
    this.showTT=false;
    this.day="Weekday";
    this.hours=[];
    this.minutes=[];
    this.cityLines=[];
    this.subLines=[];
    this.times=""; 
    this.line=""; 
  }

  onCity()
  {
      this.city=true;
      this.suburban=false;
      this.showTT=false;
      this.times="";
  }

  onSuburban()
  {
    this.times="";
    this.city=false;
    this.suburban=true;
    this.showTT=false;
  }

  callGetTimetables()
  {
    this.serverService.getAllTimetables().subscribe(
      data=>
      {
          this.timetables=data;
          this.subOrCity(this.timetables);
      }
     )

  }

  subOrCity(timetables:TimeTable[])
  {
    timetables.forEach(x=>{
      if(x.Type=="City")
        {
            if(this.cityLines.findIndex(y=>x.LineId==y.LineId)!=0)
            {
                this.cityLines.push(x);
                this.cityLines.sort((function(a, b){return a-b}));   
            }
        }
      else
      {     
        if(this.subLines.findIndex(y=>x.LineId==y.LineId)!=0)
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
    this.times="";
    t=this.timetables.findIndex(item=>item.Day==this.day && item.LineId==this.line)

    if(t!=-1)
        this.times=this.timetables[t].Times;
    else
        this.times="";
  }

  Show()
  {
      this.showTT=true;
      var times2=[];
      this.hours=[];
      this.minutes=[];

      if(this.times=="")
      {
        alert("There is no timetable for this day and line yet")
        this.showTT=false;
      }
      else
      {       
         times2=this.times.split(';');  
         times2.forEach(
            x=>
            {
                this.hours.push(x.split(':')[0]);
                this.minutes.push(x.split(':')[1]);
            }
         )
      }
  }
}
