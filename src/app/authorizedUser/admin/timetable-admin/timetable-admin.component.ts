import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableComponent } from 'src/app/shared/timetable/timetable.component';
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
  @ViewChild(TimetableComponent,{static:false})childTimetable:TimetableComponent

  times:string
  timetable:TimeTable
  add:boolean
  show:boolean
  timetables:TimeTable[]

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

    this.timetableService.sharedTimes.subscribe(data=>{
      this.times=data;
    })

    this.timetableService.GetTimetables.subscribe(data=>{
      this.timetables=data;
    })

    this.timetableService.SendNew.subscribe(data=>{
      this.timetables=data;
      this.childTimetable.timetables=data;
      this.childTimetable.findTimeForTimetable();
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
