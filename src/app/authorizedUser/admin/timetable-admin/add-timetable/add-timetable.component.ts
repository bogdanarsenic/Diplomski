import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent implements OnInit {

  @Input() timetable:TimeTable
  @Input() times:string

  constructor(private service:TimetableService,private router:Router) 
  {}

  ngOnInit(){
  }

  onSubmit()
  {
    this.timetable.Times=this.times;

    this.service.postTimetable(this.timetable).subscribe(
        data=>
            {
              this.router.navigate(['']).then(()=>window.location.reload());
            }
    )
  }
}

