import { Component, OnInit,ViewChild } from '@angular/core';
import { Line } from 'src/app/sharedComponents/classes/Line';
import { Station } from 'src/app/sharedComponents/classes/Station';
import { StationLine } from 'src/app/sharedComponents/classes/StationLine';
import { LinesComponent } from 'src/app/sharedComponents/lines/lines.component';
import { LinesService } from 'src/app/sharedComponents/lines/lines.service';
import { AddLinesComponent } from './add-lines/add-lines.component';
import { EditLinesComponent } from './edit-lines/edit-lines.component';
import { LinesAdminService } from './lines-admin.service';

@Component({
  selector: 'app-lines-admin',
  templateUrl: './lines-admin.component.html',
  styleUrls: ['./lines-admin.component.css']
})
export class LinesAdminComponent implements OnInit {

  lines:Line[];
  location:Geolocation;
  lineId:number;
  station:Station;
  stations:Station[];
  stationLines:StationLine[];


  @ViewChild(LinesComponent,{static:false}) childC:LinesComponent
  @ViewChild(AddLinesComponent,{static:false}) childAdd:AddLinesComponent
  @ViewChild(EditLinesComponent,{static:false}) childEdit:EditLinesComponent

  constructor(private lineAdminService:LinesAdminService, private lineService:LinesService) { }

  ngOnInit(){
    this.lineAdminService.SendAddressLocation.subscribe(
      data=>
      {
        this.location=data;
        if(data!=undefined)
        {
          this.childAdd.openModal('custom-modal-1');
        }
      });

    this.lineService.TakeLines.subscribe(
        data=>
        {
          this.lines=data;
        }
      )

      this.lineService.TakeStations.subscribe(
        data=>
        {
          this.stations=data;
        }
      )  

      this.lineService.TakeStationLines.subscribe(
        data=>
        {
          this.stationLines=data;
        }
      )  

    this.lineAdminService.TakeLineId.subscribe(
      data=>
      {
        if(data!=undefined)
        {
            this.lineId=data;
            this.childEdit.TakeLine(this.lineId);
        }
      }
    )

    this.lineAdminService.TakePolyline.subscribe(
      data=>
      {
        if(data==true)
        {
            this.childC.childMap.addPolyline();
        }
      }
    )

    this.lineAdminService.GetStation.subscribe(
      data=>
      {
          if(data!=undefined)
          {
            this.childEdit.GetStation(data);
          }
      }
    )
  }
  open()
  {
    this.childAdd.openModal('custom-modal-2');
  }

  Edit()
  {
    this.childEdit.Edit();
  }

  deleteLine()
  {
    this.childEdit.deleteLine();
  }
}
