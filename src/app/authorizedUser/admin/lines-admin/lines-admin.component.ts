import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { Line } from 'src/app/shared/classes/Line';
import { LineListComponent } from 'src/app/shared/lines/line-list/line-list.component';
import { LinesComponent } from 'src/app/shared/lines/lines.component';

@Component({
  selector: 'app-lines-admin',
  templateUrl: './lines-admin.component.html',
  styleUrls: ['./lines-admin.component.css']
})
export class LinesAdminComponent implements OnInit {

  lines:Line[];

  @ViewChild(LinesComponent,{static:false}) childC:LinesComponent

  constructor() { }

  ngOnInit(){
    setTimeout(()=>
    {
      this.lines=this.childC.lines
    },1000);
  }
}
