import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Line } from '../../classes/Line';
import { Station } from '../../classes/Station';
import { StationLine } from '../../classes/StationLine';
import { LinesService } from '../lines.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {

  lines:Line[];
  lineNames:any[];
  allStations:Station[];
  allStationLines:StationLine[];

  @Output() line:EventEmitter<string>;

  constructor(private lineService:LinesService) { }

  ngOnInit(){
    this.lineNames=[];
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
          this.lineNames=this.lines.map((x)=>{ return x["Name"]});      
          this.lineNames.sort((function(a, b){return a-b}));
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
        },
        error => {
          console.log(error);
        }
      )
  }

  onItemChange(line:string)
  {
      this.lineService.TakeSelectedLine.emit(line);
  }
}
