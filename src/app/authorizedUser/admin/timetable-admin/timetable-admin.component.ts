import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableComponent } from 'src/app/shared/timetable/timetable.component';
import * as fromApp from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timetable-admin',
  templateUrl: './timetable-admin.component.html',
  styleUrls: ['./timetable-admin.component.css']
})
export class TimetableAdminComponent implements OnInit,OnDestroy {

  @ViewChild(TimetableComponent,{static:false})childTimetable:TimetableComponent

  timetable:TimeTable
  show:boolean
  timetables: TimeTable[];
  subscription:Subscription;

  constructor(public store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.timetable=new TimeTable();
    this.show=false;
    this.setTimetables();
  }

  setTimetables()
  {
    setTimeout(()=>{
      this.subscription=this.store.select('timetable').subscribe(data=>{

        this.timetables=data.timetables;
        
        if(data.selectedTimetable!=null)
        {
          this.show=true;
          this.timetable=data.selectedTimetable;
          this.childTimetable.timetableForAdmin=data.selectedTimetable;
        }
        else
          this.show=false;
          
        this.childTimetable.timetables=data.timetables;
      })
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
