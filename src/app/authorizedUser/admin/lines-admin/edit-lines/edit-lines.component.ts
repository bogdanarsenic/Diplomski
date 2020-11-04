import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Line } from 'src/app/shared/classes/Line';
import { Station } from 'src/app/shared/classes/Station';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { LinesAdminService } from '../lines-admin.service';

@Component({
  selector: 'app-edit-lines',
  templateUrl: './edit-lines.component.html',
  styleUrls: ['./edit-lines.component.css']
})
export class EditLinesComponent implements OnInit {

  radioSelected:string;
  timetables:TimeTable[];
  stationEdit:Station;
  editStation:boolean;
  edit:boolean;
  lineEdit:Line;
  lineId:number;
  linesTemp:Line[]

  @Input() lines:Line[];
  @Input() station:Station;
  

  constructor(private lineAdminService:LinesAdminService,private router:Router) { }

  ngOnInit() {
    this.editStation=false;
  }

  TakeLine(lineId:number)
  {
    this.lineId=lineId;
    this.linesTemp=this.lines.map((x)=>{ return {...x}})
    this.lineEdit=this.linesTemp.find(x=>x.Id==lineId);
    this.editStation=false;
  }

  GetStation(station:Station)
  {
      this.editStation=true;
      this.stationEdit=station;
  }
  
  UpdateLine()
  {
    var i=this.lines.findIndex(x=>x.Name===this.lineEdit.Name);

    if(i==-1 && this.lineEdit.Name!="")
    {
        this.lineAdminService.putLine(this.lineId, this.lineEdit)
        .subscribe(
          data => {
        
          },
          error => {
            console.log(error);
          }
        )
        this.router.navigate(['/lines']).then(()=>window.location.reload());  
        }   
    else
    {
        alert("You need to pick another name.");
    }
  }

  UpdateStation()
  {
    this.lineAdminService.putStation(this.stationEdit.Id, this.stationEdit)
    .subscribe(
      data => {
        this.router.navigate(['/lines']).then(()=>window.location.reload());  
      },
      error => {
        console.log(error);
      }
    )
    
  }

  deleteLine(){

    if(this.radioSelected!="")
    {
        this.lineAdminService.deleteLine(this.lineId)
        .subscribe(
          data => {
            this.router.navigate(['/lines']).then(()=>window.location.reload());   
          },
          error => {
            console.log(error);
          }
        )
     }
    else
    {
        alert("You need to check line that you want to delete");
    }
  }

  deleteStation(){
    this.lineAdminService.deleteStation(this.stationEdit.Id)
    .subscribe(
      data => {
        this.router.navigate(['/lines']).then(()=>window.location.reload());  
        console.log("OK");     
      },
      error => {
        console.log(error);
      }
    )
  }
  
  Edit()
  {
    this.edit=true;
  }

}
