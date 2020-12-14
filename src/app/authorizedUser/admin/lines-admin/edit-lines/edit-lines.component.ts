import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Line } from 'src/app/shared/classes/Line';
import { Station } from 'src/app/shared/classes/Station';
import { LinesService } from 'src/app/shared/lines/lines.service';
import { LinesAdminService } from '../lines-admin.service';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-edit-lines',
  templateUrl: './edit-lines.component.html',
  styleUrls: ['./edit-lines.component.css']
})
export class EditLinesComponent implements OnInit {

  stationEdit:Station;
  editStation:boolean;
  edit:boolean;
  lineEdit:Line;
  lineId:number;
  index:number;
  indexStation:number;

  @Input() lines:any[];
  @Input() station:Station;
  @Input() stations:Station[];
  

  constructor(private lineAdminService:LinesAdminService, private lineService:LinesService, private router:Router) { }

  ngOnInit() {
    this.editStation=false;
  }

  TakeLine(lineId:number)
  {
    this.lineId=lineId;
    var linesTemp=this.lines.map((x)=>{ return {...x}})
    this.lineEdit=linesTemp.find(x=>x.Id==lineId);
    this.index=linesTemp.findIndex(x=>x.Id==lineId);
    this.editStation=false;
  }

  GetStation(station:Station)
  {
      this.editStation=true;
      this.stationEdit=station;    
      var stationsTemp=this.stations.map((x)=>{ return {...x}})
      this.indexStation=stationsTemp.findIndex(x=>x.Id==this.stationEdit.Id);
  }
  
  UpdateLine()
  {
    var i=this.lines.findIndex(x=>x.Name===this.lineEdit.Name);

    if(i==-1 && this.lineEdit.Name!="")
    {

        this.lineAdminService.putLine(this.lineId, this.lineEdit)
        .subscribe(
          data => { 
       
            this.lines.splice(this.index,1);
            this.lines.push(this.lineEdit);
            this.lines.sort((a,b)=> a.Name-b.Name);
            this.lineService.TakeLines.emit(this.lines);
            }
        ) 
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
            this.stations.splice(this.indexStation,1);
            this.stations.push(this.stationEdit);
            this.lineService.TakeStations.emit(this.stations);
      }
    )
    
  }

  deleteLine(){

    this.lineAdminService.deleteLine(this.lineId).subscribe(
        data => {
                  this.lines.splice(this.index,1);
                  this.lineService.TakeLines.emit(this.lines); 
                }
        )
  }

  deleteStation(){
    this.lineAdminService.deleteStation(this.stationEdit.Id).subscribe(
      data => {
        this.router.navigate(['']).then(()=>window.location.reload());
      }
    )
  }
  
  Edit()
  {
    this.edit=true;
  }

}
