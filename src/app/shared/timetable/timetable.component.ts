import { Component, OnDestroy, OnInit} from '@angular/core';
import { TimeTable } from '../classes/TimeTable';
import { TimetableService } from './timetable.service';
import { Line } from '../classes/Line';
import { LinesService } from '../lines/lines.service';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as TimetableActions from 'src/app/authorizedUser/admin/timetable-admin/store/timetable.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit,OnDestroy {

  cityLines: any[]
  subLines:any[]
  timetable:TimeTable
  timetables:TimeTable []
  days: Array<string> = ["Weekday","Saturday","Sunday"];
  day:string;
  suburban:boolean;
  city : boolean;
  showTT:boolean;
  line:string;
  admin:boolean;
  
 timetableForAdmin:TimeTable

  constructor(
              private timetableService:TimetableService,
              private lineService:LinesService, 
              private authService:AuthService, 
              private store: Store<fromApp.AppState>
              ) 
  {
    this.timetable=new TimeTable();
  }

  ngOnInit(){
    
    this.store.select('timetable').subscribe(x=>
      {
          this.timetables=x.timetables;
      });

    this.admin=this.authService.getRole()=='Admin'?true:false
    this.callGetTimetables();
    this.callGetLines();
    this.timetables=[];
    this.day="Weekday";
    this.cityLines=[];
    this.subLines=[];
  }

  ngOnDestroy(){
    this.store.dispatch(new TimetableActions.ResetValues());
  }

    callGetTimetables()
  {
      this.store.dispatch(new TimetableActions.FetchTimetables());
  }

  callGetLines()
  {
    this.lineService.getAllLines().subscribe(
      data=>
      {
        this.subOrCity(data);
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
    this.timetableService.Show.emit(this.showTT);
  }

  onChangeLine(line)
  { 
    this.showTT=false;
      if(line!="")
      {
        this.line=line;
        if(this.admin)
          this.findTimeForAdmin();
        else
          this.findTimeForTimetable();
      }
  }

  checkDay(day)
  {
      this.showTT=false;
      this.day=day;
      if(this.admin && this.line!="")
        this.findTimeForAdmin();
      else if(!this.admin)
        this.findTimeForTimetable();
  }

  findTimeForTimetable()
  {
    var t=this.timetables.findIndex(item=>item.Day==this.day && item.LineId==this.line)
    
    if(t!=-1) 
          this.timetable={...this.timetables[t]}
    else
          this.timetable.Id="";
  }

  Show()
  {
      if(this.timetable.Id=="" || this.timetable.Id==undefined)
      {
        alert("There is no timetable for this day and line yet")
        this.showTT=false;
      }
      else
        this.showTT=true;
  }

  findTimeForAdmin()
  {
    var t=this.timetables.findIndex(item=>item.Day==this.day && item.LineId==this.line) 
    this.showTT=true;

    if(t!=-1) 
    {
      this.timetableService.Show.emit(this.showTT);
      this.store.dispatch(new TimetableActions.SelectedTimetable({...this.timetables[t]}));
    }       
    else
    {

      this.timetableService.Show.emit(this.showTT);
      var timetable={...this.timetableForAdmin};
      timetable.Id="";
      timetable.Day=this.day;
      timetable.LineId=this.line;
      timetable.Type=(Number(this.line)>30)?"Suburban":"City";
      timetable.Times="";
      this.timetableForAdmin=timetable;
      
      this.store.dispatch(new TimetableActions.SelectedTimetable(this.timetableForAdmin));
     }
  }

}
