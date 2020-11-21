import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';
import { AddTimetableComponent } from './add-timetable/add-timetable.component';
import { EditTimetableComponent } from './edit-timetable/edit-timetable.component';

@Component({
  selector: 'app-timetable-admin',
  templateUrl: './timetable-admin.component.html',
  styleUrls: ['./timetable-admin.component.css']
})
export class TimetableAdminComponent implements OnInit {

  @ViewChild(EditTimetableComponent,{static:false}) childEdit:EditTimetableComponent
  @ViewChild(AddTimetableComponent,{static:false}) childAdd:AddTimetableComponent

  times:string
  timetable:TimeTable
  add:boolean
  show:boolean

  constructor(private timetableService:TimetableService) { }

  ngOnInit() {
    this.add=false;
    this.show=false;
    this.timetableService.AddorEdit.subscribe(data=>{
        this.timetable=data;
        this.ShowEditorAdd();
    })

    this.timetableService.Show.subscribe(data=>{
      this.show=data;
    })

    this.timetableService.SharedTimes.subscribe(data=>{
      this.times=data;
    })

  }
  
  onEdit()
  {
    this.childEdit.onSubmit();
  }

  onDelete()
  {
    this.childEdit.Delete();
  }

  onAdd()
  {
    this.childAdd.onSubmit();
  }

  ShowEditorAdd()
  {
      return this.add=this.timetable.Id!=""? false : true;
  }
}
