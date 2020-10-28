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

  selectedLine:string;
  allStations:Station[];
  allStationLines:StationLine[]
  lines:Line[]
  constructor(private lineService:LinesService) { }

  ngOnInit(){
    this.lineService.TakeSelectedLine.subscribe(
      data=>
        {
            this.selectedLine=data;
            if(this.selectedLine!=undefined)
            {
                this.childC.onItemChange(this.selectedLine);
            }
        }
    )

    this.lineService.TakeLines.subscribe(
      data=>
        {
            this.lines=data;
        }
    )

    this.lineService.TakeStationLines.subscribe(
      data=>
        {
            this.allStationLines=data;
        }
    )

    this.lineService.TakeStations.subscribe(
      data=>
        {
            this.allStations=data;
        }
    )
  }
}
