import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent implements OnInit {

  @Input() timetable:TimeTable
  @Input() timetables:TimeTable[]
  @Input() times:string

  constructor(private timetableService:TimetableService, private store: Store<fromApp.AppState>) 
  {}

  ngOnInit(){
  }

  onSubmit()
  {
    this.timetable.Times=this.times;

    this.timetableService.postTimetable(this.timetable).subscribe(
        data=>
            {
              this.timetable.Id=data.Id;
              this.timetables.push(this.timetable);
              this.timetableService.SendNew.emit(this.timetables);
              this.times="";
              this.timetableService.sharedTimes.emit(this.times);  
            }
    )
  }
}

