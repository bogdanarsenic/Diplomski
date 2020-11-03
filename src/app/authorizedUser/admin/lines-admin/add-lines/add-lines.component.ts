import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { Line } from 'src/app/shared/classes/Line';
import { Station } from 'src/app/shared/classes/Station';
import { StationLine } from 'src/app/shared/classes/StationLine';
import { GeoLocation } from 'src/app/shared/lines/map/model/geolocation';
import { LinesAdminService } from '../lines-admin.service';

@Component({
  selector: 'app-add-lines',
  templateUrl: './add-lines.component.html',
  styleUrls: ['./add-lines.component.css']
})
export class AddLinesComponent implements OnInit {

  bodyText:string;
  bodyText1:string;
  station:Station;
  stationLine:StationLine;
  stationId:string;
  line:Line;
  @Input() lines:Line[]
  @Input() location:GeoLocation;
  @Input() lineId:number;

  constructor(private modalService: ModalService,private lineAdminService:LinesAdminService,private router:Router)
  { }

  ngOnInit(){}

  save()
  {
    if(this.bodyText!="")
    {
        this.station=new Station();
        this.stationLine = new StationLine();
        this.station.Name = this.bodyText;
        this.station.Address = this.location.address;
        this.station.CoordinateX = this.location.latitude;
        this.station.CoordinateY = this.location.longitude;
        this.station.LineId=String(this.lineId);
        this.modalService.close('custom-modal-1');
        this.lineAdminService.TakePolyline.emit(true);
        this.bodyText = '';
        this.postStation();
    }
  else{
    alert("You need to put station name");
  }
  }

  postStation(){
    this.station.Address = this.location.address;
    this.lineAdminService.postStation(this.station)
        .subscribe(
          data =>{
            this.stationId = data.Id;
            this.postStationLine();
          },
          error => {
            console.log(error);
          }
        )
  }

  postStationLine(){
    
    this.stationLine.LineId = this.lineId;
    this.stationLine.StationId = this.stationId;
    this.lineAdminService.postStationLine(this.stationLine)
        .subscribe(
          data =>{
          },
          error => {
            console.log(error);
          }
        )
  }

  postLine(){
    this.lineAdminService.postLine(this.line)
        .subscribe(
          data =>{
          this.lineId = data.Id;           
          this.router.navigate(['/lines-admin']).then(()=>window.location.reload());        
          },
          error => {
            console.log(error);
          }
        )
  }
  
  openModal(id: string) {
   this.modalService.open(id);
  }

  closeModal(id: string) {
  this.modalService.close(id);
  }

  createLine(){

    var i=this.lines.findIndex(x=>x.Name===this.bodyText1);

    if(this.bodyText1!="" && i==-1){

      this.line = new Line();
      this.line.Name = this.bodyText1;
      this.modalService.close('custom-modal-2');
      this.bodyText1 = "";
      this.postLine();
    }
    else if(i!=-1){
      alert("There is already line with that name");
    }
    else
    {
      alert("You need to put the name of a line");
    }
  }
}
