import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import * as fromApp from 'src/app/store/app.reducer';
import * as TimetableActions from 'src/app/authorizedUser/admin/timetable-admin/store/actionsTmt';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent {

  @Input() timetable:TimeTable

  constructor(private store: Store<fromApp.AppState>) 
  {}

  onSubmit()
  {
    this.store.dispatch(new TimetableActions.AddTimetable(this.timetable));
  }
}

