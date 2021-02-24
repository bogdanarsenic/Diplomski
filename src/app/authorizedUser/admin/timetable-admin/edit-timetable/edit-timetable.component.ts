import { Component, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import * as fromApp from 'src/app/store/app.reducer';
import * as TimetableActions from 'src/app/authorizedUser/admin/timetable-admin/store/timetable.actions';

@Component({
  selector: 'app-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.css']
})
export class EditTimetableComponent implements OnChanges {

  @Input() timetable:TimeTable;
  @Input() timetables:TimeTable[]

  index:number

  constructor(private store: Store<fromApp.AppState>) 
  { }

  ngOnChanges()
  {
    this.index=this.timetables.findIndex(x=>x.Id===this.timetable.Id);
  }

  onSubmit()
  {
    this.store.dispatch(new TimetableActions.EditTimetable({index:this.index,newTimetable:this.timetable}));
  }  

  Delete()
  {
    this.store.dispatch(new TimetableActions.DeleteTimetable({index:this.index,selectedTimetable:this.timetable}));
  }
}
