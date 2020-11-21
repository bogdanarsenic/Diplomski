import { Component, OnInit } from '@angular/core';
import { Station } from '../../classes/Station';
import { StationLine } from '../../classes/StationLine';
import { LinesService } from '../lines.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {

  lines:any[];
  allStations:Station[];
  allStationLines:StationLine[];

  constructor(private lineService:LinesService) { }

  ngOnInit(){
    this.callGetLines();
    this.callGetStation();
    this.callGetStationLine();
  }

  callGetLines()
  {
    this.lineService.getAllLines().subscribe
    (
      data=>
      {
          this.lines=data; 
          this.lines.sort((function(a,b){return a.Name-b.Name}))
          this.lineService.TakeLines.emit(this.lines);
      }
    )
  }

  callGetStation()
  {
      this.lineService.getAllStations().subscribe(
        data=>{
          this.allStations=data;
          this.lineService.TakeStations.emit(this.allStations);
        }
      )
  }

  callGetStationLine(){
    this.lineService.getAllStationLines()
      .subscribe(
        data => {
          this.allStationLines = data;      
          this.lineService.TakeStationLines.emit(this.allStationLines);   
        }
      )
  }

  onItemChange(line:string)
  {
      this.lineService.TakeSelectedLine.emit(line);
  }
}
