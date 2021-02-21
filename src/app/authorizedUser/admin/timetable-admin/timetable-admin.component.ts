import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableComponent } from 'src/app/shared/timetable/timetable.component';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';
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

  constructor(private timetableService:TimetableService,private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.timetable=new TimeTable();

    this.timetableService.Show.subscribe(data=>{
      this.show=data;
    })

    setTimeout(()=>{
      this.subscription=this.store.select('timetable').subscribe(data=>{

        this.timetables=data.timetables;
        
        if(data.selectedTimetable!=null)
        {
          this.timetable=data.selectedTimetable;
          this.childTimetable.timetableForAdmin=data.selectedTimetable;
        }

        this.childTimetable.timetables=data.timetables;
      })
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
