import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { EditTimetableComponent } from '../edit-timetable/edit-timetable.component';
import { AddTimetableComponent } from '../add-timetable/add-timetable.component';

@Component({
  selector: 'app-form-timetable',
  templateUrl: './form-timetable.component.html',
  styleUrls: ['./form-timetable.component.css']
})
export class FormTimetableComponent implements OnInit {

  @ViewChild(EditTimetableComponent,{static:false}) childEdit:EditTimetableComponent
  @ViewChild(AddTimetableComponent,{static:false}) childAdd:AddTimetableComponent

  @Input() timetable:TimeTable
  @Input() timetables:TimeTable[]

  j:string;
  broj:Array<any>;
  timetableForm:FormGroup;
  times:string;

  constructor(private fb:FormBuilder) 
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
  }

  putControl()
  {
    var timetable={...this.timetable}

    for(var i=6; i<23; i++)
    {
      if(this.timetableForm.controls[i].value!="")
      {
          this.times=(String)(i)+":"+this.timetableForm.controls[i].value;
          timetable.Times+=this.times+";";
      }
    }

    this.timetable=timetable;
  }
  
  onChange()
  {
    this.times="";

    var timetable={...this.timetable}
    timetable.Times="";
    this.timetable=timetable;

    this.putControl();
  }

  onEdit()
  { 
    this.times="";
    this.childEdit.onSubmit();
  }

  onDelete()
  {
    this.times="";
    this.childEdit.Delete();
  }

  onAdd()
  {
    this.times="";
    this.childAdd.onSubmit();
  }
}
