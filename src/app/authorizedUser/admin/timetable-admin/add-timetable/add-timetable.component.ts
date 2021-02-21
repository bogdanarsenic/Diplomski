import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as TimetableActions from 'src/app/authorizedUser/admin/timetable-admin/store/timetable.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent implements OnInit {

  @Input() timetable:TimeTable
  @Input() timetables:TimeTable[]
  subscription: Subscription;

  constructor(private timetableService:TimetableService, private store: Store<fromApp.AppState>) 
  {}

  ngOnInit(){}

  onSubmit()
  {
    this.timetableService.postTimetable(this.timetable).subscribe(
        data=>
            {
              this.timetable.Id=data.Id;
              this.store.dispatch(new TimetableActions.AddTimetable(this.timetable));
            }
    )
  }
}

