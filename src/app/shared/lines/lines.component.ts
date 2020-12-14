import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(MapComponent, { static: false }) childMap: MapComponent

  stations:Station[];
  allStationLines:StationLine[]
  lines:Line[]
  lineId:number;
  @Input() vehicle:boolean;

  constructor(private lineService:LinesService) { }

  ngOnInit(){
    
    this.TakeSelectedLine();
    this.TakeLines();
    this.TakeStationLines();
    this.TakeStations();
    
  }


  TakeSelectedLine(){
    this.lineService.TakeSelectedLine.subscribe(
      data=>
        {
            if(data!=undefined)
            {
                this.childMap.onItemChange(data);
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
            this.stations=data;
        }
    )
  }

}
