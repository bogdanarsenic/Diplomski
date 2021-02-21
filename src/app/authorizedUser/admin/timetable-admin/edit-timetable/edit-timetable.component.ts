import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as TimetableActions from 'src/app/authorizedUser/admin/timetable-admin/store/timetable.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.css']
})
export class EditTimetableComponent implements OnInit {

  @Input() timetable:TimeTable;
  @Input() timetables:TimeTable[]
  subscription:Subscription

  constructor(private timetableService:TimetableService,private store: Store<fromApp.AppState>) 
  { }

  ngOnInit(){}

  onSubmit()
  {
    var i=this.timetables.findIndex(x=>x.Id===this.timetable.Id);

    this.timetableService.putTimeTable(this.timetable.Id,this.timetable).subscribe(
        data=>
            {
              this.store.dispatch(new TimetableActions.StartEdit(i));
              this.store.dispatch(new TimetableActions.EditTimetable(this.timetable));
            }
      )
  }  

  Delete()
  {
    var i=this.timetables.findIndex(x=>x.Id===this.timetable.Id);

    this.timetableService.deleteTime(this.timetable.Id).subscribe(
        data=>
        {
          this.store.dispatch(new TimetableActions.StartEdit(i));
          this.store.dispatch(new TimetableActions.DeleteTimetable(this.timetable));
        }
      )
  }
}
