import { Component, Input, OnInit } from '@angular/core';
import { TimeTable } from 'src/app/sharedComponents/classes/TimeTable';
import { TimetableService } from 'src/app/sharedComponents/timetable/timetable.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.css']
})
export class EditTimetableComponent implements OnInit {

  @Input() timetable:TimeTable;
  @Input() times:string;
  @Input() timetables:TimeTable[]

  
  constructor(private timetableService:TimetableService) 
  { }

  ngOnInit(){ 
  }

  onSubmit()
  {
      var i=this.timetables.findIndex(x=>x.Id===this.timetable.Id);

      this.timetable.Times=this.times;
      this.timetableService.putTimeTable(this.timetable.Id,this.timetable).subscribe(
        data=>
            {
              this.timetables.splice(i,1);
              this.timetables.push(this.timetable);
              this.timetableService.AddorEdit.emit(this.timetable);
              this.timetableService.SendNew.emit(this.timetables);   
              this.times="";
              this.timetableService.sharedComponentsTimes.emit(this.times);  
            }
      )
  }  

  Delete()
  {

    var i=this.timetables.findIndex(x=>x.Id===this.timetable.Id);

      this.timetableService.deleteTime(this.timetable.Id).subscribe(
        data=>
        {
          this.timetables.splice(i,1);
          this.timetableService.SendNew.emit(this.timetables);    
        }
      )
  }

}
