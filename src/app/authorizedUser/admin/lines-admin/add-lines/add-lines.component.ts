import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { Line } from 'src/app/shared/classes/Line';
import { Station } from 'src/app/shared/classes/Station';
import { StationLine } from 'src/app/shared/classes/StationLine';
import { LinesService } from 'src/app/shared/lines/lines.service';
import { GeoLocation } from 'src/app/shared/lines/map/model/geolocation';
import { Polyline } from 'src/app/shared/lines/map/model/polyline';

@Component({
  selector: 'app-add-lines',
  templateUrl: './add-lines.component.html',
  styleUrls: ['./add-lines.component.css']
})
export class AddLinesComponent implements OnInit {

  bodyText:string;
  bodyText1:string;
  polyline:Polyline
  station:Station;
  stationLine:StationLine;
  address:string;
  location:GeoLocation;
  lineId:number;
  stationId:string;
  line:Line;
  @Input() lines:Line[]



  constructor(private modalService: ModalService,private lineService:LinesService,private router:Router) { }

  ngOnInit(){
  }

  save()
  {
    if(this.bodyText!="")
    {

        this.polyline.addLocation(this.location)
        this.station=new Station();
        this.stationLine = new StationLine();
        this.station.Name = this.bodyText;
        this.station.Address = this.address;
        this.station.CoordinateX = this.location.latitude;
        this.station.CoordinateY = this.location.longitude;

        this.modalService.close('custom-modal-1');
        this.bodyText = '';
        this.postStation();
  }
  else{
    alert("You need to put station name");
  }
  }

  postStation(){
    this.station.Address = this.address;
    this.lineService.postStation(this.station)
        .subscribe(
          data =>{
            this.stationId = data.Id;
            this.postStationLine();
           console.log("Poslata stanica.");
          },
          error => {
            console.log(error);
          }
        )
  }

  postStationLine(){
    
    this.stationLine.LineId = this.lineId;
    this.stationLine.StationId = this.stationId;
    this.lineService.postStationLine(this.stationLine)
        .subscribe(
          data =>{
           console.log("Poslata stationline.");
          },
          error => {
            console.log(error);
          }
        )
  }

  postLine(){
    this.lineService.postLine(this.line)
        .subscribe(
          data =>{
            this.lineId = data.Id;
           console.log("Poslata linija.");
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
