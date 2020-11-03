import { Component, OnInit, ViewChild } from '@angular/core';
import { Line } from '../classes/Line';
import { Station } from '../classes/Station';
import { StationLine } from '../classes/StationLine';
import { LinesService } from './lines.service';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit {

  @ViewChild(MapComponent, { static: false }) childC: MapComponent

  allStations:Station[];
  allStationLines:StationLine[]
  lines:Line[]
  vehicle:boolean
  lineId:number;

  constructor(private lineService:LinesService) { }

  ngOnInit(){
    
    this.TakeSelectedLine();
    this.TakeLines();
    this.TakeStationLines();
    this.TakeStations();
  }

  onVehicle()
  {
    this.childC.onVehicle();
  }

  Marker(latMarker:number,longMarker:number)
  {
    this.childC.setVehicleMarker(latMarker,longMarker)
  }


  TakeSelectedLine(){
    this.lineService.TakeSelectedLine.subscribe(
      data=>
        {
            if(data!=undefined)
            {
                this.childC.onItemChange(data);
            }
        }
    )
  }

  TakeLines(){
    this.lineService.TakeLines.subscribe(
      data=>
        {
            this.lines=data;
        }
    )
  }

  TakeStationLines()
  {
    this.lineService.TakeStationLines.subscribe(
      data=>
        {
            this.allStationLines=data;
        }
    )
  }

  TakeStations(){
    
    this.lineService.TakeStations.subscribe(
      data=>
        {
            this.allStations=data;
        }
    )
  }

}
