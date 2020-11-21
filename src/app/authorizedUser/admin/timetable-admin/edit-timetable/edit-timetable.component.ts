import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.css']
})
export class EditTimetableComponent implements OnInit {

  @Input() timetable:TimeTable;
  @Input() times:string;
  
  constructor(private service:TimetableService,private router:Router) 
  { }

  ngOnInit(){ 
  }

  onSubmit()
  {
      this.timetable.Times=this.times;
      this.service.putTimeTable(this.timetable.Id,this.timetable).subscribe(
        data=>
            {
                this.router.navigate(['']).then(()=>window.location.reload());                  
            }
      )
  }  

  Delete()
  {
      this.service.deleteTime(this.timetable.Id).subscribe(
        data=>
        {
          this.router.navigate(['']).then(()=>window.location.reload());
        }
      )
  }

}
