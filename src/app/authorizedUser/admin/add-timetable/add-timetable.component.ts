import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicesService } from 'src/app/services/services.service';
import { Line } from 'src/app/shared/classes/Line';
import { TimeTable } from 'src/app/shared/classes/TimeTable';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent implements OnInit {

  
  lines:Array<Line>

  lineNames:Array<any>

  timeTable:Array<any>

  cityLines:Array<any>
  subLines:Array<any>
  isAdmin:boolean;
  line:Line;
  id:string;
  i:number;
  j:string;
  times:string;
  times2:string[];

  idTT:string;

  timetable:TimeTable
  timetables:Array<TimeTable>

  days: Array<string> = ["Weekday", "Saturday", "Sunday"];

  day:string;

  daychecked:boolean;

  lineId:string;

  broj:Array<any>;

  radioSelected:string;

  timetableForm:FormGroup;

  edit:boolean

  suburban:boolean;
  city : boolean;

  showTT:boolean;

  selected:string;

  provera:number;
  checked:boolean;

  hours:string[];
  minutes:string[];

  constructor(private fb:FormBuilder,private serverService:ServicesService,private router:Router) 
  {
    this.createForm();
  }

  createForm()
  {
    this.timetableForm=this.fb.group({
      "6":[''],
      "7":[""],
      "8":[""],
      "9":[""],
      "10":[""],
      "11":[""],
      "12":[""],
      "13":[""],
      "14":[""],
      "15":[""],
      "16":[""],
      "17":[""],
      "18":[""],
      "19":[""],
      "20":[""],
      "21":[""],
      "22":[""],
  })
}

  ngOnInit(){

    this.callGetLines();
    this.callGetTimetables();
    this.edit=false;
    this.timetables=[];
    this.broj=["6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"];
    this.j="";
    this.city=false;
    this.suburban=false;
    this.showTT=false;
    this.daychecked=false;
    this.selected="";
    this.day="";
    this.times2=[];
    this.hours=[];
    this.minutes=[];
    this.provera=0;

    this.checked=false;

    this.lineNames=[];
    this.lines=[];
    this.cityLines=[];
    this.subLines=[];
    this.id="";
    this.i=6;
    this.times="";

    this.timetable=new TimeTable();
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
        this.serverService.getAllTimetables().subscribe(
          data=>
          {
              if(data.Type=="City")
                this.cityLines.push(data);
              else
                this.subLines.push(data);
          }
         )
      }
     )
  }

  callGetLines()
  {
    this.serverService.getAllLines().subscribe(
      data=>
      {
        this.lines=data;
        this.lines.forEach(
          element=>
          {
            this.lineNames.push(element.Name);     
          }
        )
        this.lineNames.sort((function(a, b){return a-b}));
      }
      
    )
  }

  getID()
  {
    this.timetables.forEach(x => {
      if(x.LineId == this.id && x.Day == this.day)
      {
        this.idTT = x.Id;
      }
    });
  }

  putControl()
  {
    for(this.i=6;this.i<23;this.i++)
    {
      if(this.timetableForm.controls[this.i].value!="")
      {
          this.times=(String)(this.i)+":"+this.timetableForm.controls[this.i].value;

          this.timetable.Times+=this.times+";";
      }
    }

  }

  onSubmit()
  {
    this.timetable.Times="";

    this.putControl();

    if(this.timetable.Times=="" || this.timetable.LineId=="")
    {
      alert("You need to put some time");
    }

    else{
          if(this.edit==true)
          {

              this.timetable.LineId=this.id;
              this.timetable.Day=this.day;

              
              
              this.cityOrsub();
              this.getID();

              this.timetable.Id=this.idTT;
              
              this.serverService.putTimeTable(this.idTT,this.timetable).subscribe(
                data=>
                {
                      console.log("uspesno editovan");   
                      this.router.navigate(['']).then(()=>window.location.reload());     
                }
                )
          }
          else
          {
              this.timetable.LineId=this.id;
              this.timetable.Day=this.day;

              this.cityOrsub();
            
              this.serverService.postTimetable(this.timetable).subscribe(
                data=>
                {
                  this.router.navigate(['']).then(()=>window.location.reload());
                }
              )
          }
        }

     }

  cityOrsub()
  {
      if((Number)(this.id)<=30)
         {
            this.timetable.Type="City";
         }
      else
         {
            this.timetable.Type="Suburban"
         }
  }

  onItemChange(line)
  { 
    this.showTT=false;
      if(line!="")
      {
        this.id=line; 
                

          if(this.id!="" && this.day!="")
          {
            this.provera=1;
          }

        this.checkId();


      }
  }

  checkId()
  {
    var t;
    this.times="";
    t=this.timetables.findIndex(item=>item.Day==this.day && item.LineId==this.id)

    if(t!=-1)
    {  
        this.times=this.timetables[t].Times;
        this.edit=true;     
    }
    else
      this.edit=false;
  }

  Delete()
  {
      this.getID();
      this.serverService.deleteTime(this.idTT).subscribe(
        data=>
        {
          this.router.navigate(['/timetable']).then(()=>window.location.reload());
        }
      )
  }

  checkDay(day)
  {
      this.showTT=false;
      this.daychecked=true;
      this.checked=true;
      this.day=day;

      if(this.city==true)
      {
        this.FindLine("City",this.day);
      }
      else
        {
          this.FindLine("Suburban",this.day);
        }
  }

  FindLine(type:string,day:string)
  { 

        this.times="";
        this.timetables.forEach(x=>  {
          if(x.Type==type && x.Day==day)
          {
 
              if(type=="City")
              {
                 var nameLine=this.lines.find(line => line.Name === x.LineId).Name;

                 if(this.cityLines.indexOf(nameLine)==-1)
                 {
                   this.cityLines.push(nameLine);
                 }   
                 this.cityLines.sort((function(a, b){return a-b}));   
      
              }
              else
              {
                nameLine=this.lines.find(line => line.Name === x.LineId).Name;

                if(this.subLines.indexOf(nameLine)==-1 )
                {
                  this.subLines.push(nameLine);
                }
                this.subLines.sort((function(a, b){return a-b}));
              }
          }

          })
  }
}

