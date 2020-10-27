import { Component, OnInit } from '@angular/core';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';

@Component({
  selector: 'app-timetable-admin',
  templateUrl: './timetable-admin.component.html',
  styleUrls: ['./timetable-admin.component.css']
})
export class TimetableAdminComponent implements OnInit {

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

  ShowEditorAdd()
  {
      return this.add=this.timetable.Id!=""? false : true;
  }
}
