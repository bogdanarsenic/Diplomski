import { Component, Input, OnChanges } from '@angular/core';
import { TimeTable } from '../../classes/TimeTable';

@Component({
  selector: 'app-show-timetable',
  templateUrl: './show-timetable.component.html',
  styleUrls: ['./show-timetable.component.css']
})
export class ShowTimetableComponent implements OnChanges {

  hours:string [];
  minutes: string[];

  @Input() timetable:TimeTable

  ngOnChanges(){
    this.onShow();
  }

  onShow()
  {
    this.hours=[]
    this.minutes=[]
    var times2=[];

     times2=this.timetable.Times.split(';');  
     times2.pop();
     times2.forEach(
        x=>
        {
            this.hours.push(x.split(':')[0]);
            this.minutes.push(x.split(':')[1]);
        }
     )
  }
}
