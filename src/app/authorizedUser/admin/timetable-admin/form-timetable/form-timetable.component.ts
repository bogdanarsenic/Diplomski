import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';


@Component({
  selector: 'app-form-timetable',
  templateUrl: './form-timetable.component.html',
  styleUrls: ['./form-timetable.component.css']
})
export class FormTimetableComponent implements OnInit {

  j:string;
  timetable:TimeTable
  broj:Array<any>;
  timetableForm:FormGroup;
  times:string;

  constructor(private fb:FormBuilder,private service:TimetableService) 
  {
    this.createForm();
  }

  createForm()
  {
    this.timetableForm=this.fb.group({
      "6":[''],"7":[""],"8":[""],"9":[""],"10":[""],"11":[""],"12":[""],"13":[""],"14":[""],
      "15":[""],"16":[""],"17":[""],"18":[""],"19":[""],"20":[""],"21":[""],"22":[""],
  })
}

  ngOnInit(){

    this.broj=["6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"];
    this.j="";
    this.times="";
    this.timetable=new TimeTable();
  }

  putControl()
  {
    for(var i=6; i<23; i++)
    {
      if(this.timetableForm.controls[i].value!="")
      {
          this.times=(String)(i)+":"+this.timetableForm.controls[i].value;

          this.timetable.Times+=this.times+";";
      }
    }
      this.service.sharedTimes.emit(this.timetable.Times);
  }
  
  onChange()
  {
    this.times="";
    this.timetable.Times="";
    this.putControl();
  }
}
