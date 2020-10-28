import { Component, OnInit, NgZone } from '@angular/core';
import { MarkerInfo } from './model/marker-info.model';
import { GeoLocation } from './model/geolocation';
import { Polyline } from './model/polyline';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Station } from '../../classes/Station';
import { TimeTable } from '../../classes/TimeTable';
import { Line } from '../../classes/Line';
import { StationLine } from '../../classes/StationLine';
import { TimetableService } from '../../timetable/timetable.service';
import { ModalService } from 'src/app/services/modal.service';
import { LinesService } from '../lines.service';
import { Input } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}','app/shared/lines/map/modal.less'],
  providers: [LinesService] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {

  markerInfo: MarkerInfo;
  public polyline: Polyline;
  public zoom: number;
  showAdmin:boolean;
  bodyText:string;
  bodyText1:string;

  timetables:Array<TimeTable>=[];
  lineNames:Array<any>=[];
  
 
  stationsDraw:Array<Station>=[];
  radioSel:string;

  station:Station;
  line:Line;

  lineEdit:Line;
 

  stations:Array<Station>=[];
  
  stationId:string;
  stationIds:Array<any>=[];

  edit:boolean;

  private geoCoder;
  address:string;
  prvo:string;

  stationName:string;
  stationAddress:string;
  stationClicked:Station;

  nesto:string[];

  lineId:number;

  id:string;

  i:number;

  location:GeoLocation;

  stationEdit:Station = new Station();
  stationEditID : number;
  editStation:boolean;

 @Input() lines:Line[]
 @Input() allStationLines:StationLine[]
 @Input() allStations:Station[];

  check:string;

  constructor(private ngZone: NgZone,private lineService:LinesService,private timetableServer:TimetableService,private modalService:ModalService,private mapsAPILoader:MapsAPILoader,private router:Router){
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");

    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  }

  ngOnInit() {

    this.bodyText='';
    this.check="";
    this.bodyText1="";
    this.i=0;

    this.showAdmin=localStorage.role=="Admin"?true:false

    this.station=new Station();
    this.stationClicked=new Station();
    this.line=new Line();
    this.timetables=[];
    this.radioSel="";
    this.editStation=false;

    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
     // this.getAddress(45.242268, 19.842954); //proba

    });
  }

//--------------------------------------------

  placeMarker($event){

    if(this.showAdmin)
    {
      //this.openModal('custom-modal-1');
      this.getAddress($event.coords.lat, $event.coords.lng);
      this.location = new GeoLocation($event.coords.lat, $event.coords.lng);
      this.markerInfo = new MarkerInfo(new GeoLocation($event.coords.lat, $event.coords.lng),
        "assets/bg.png",
        "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
      console.log(this.polyline)
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 11;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  onItemChange(radioSelected:string)
  {
        this.polyline.path=[];
        this.stationsDraw = [];
        this.stationIds = [];
  
        this.lineId = this.lines.find(Line => Line.Name == radioSelected).Id;
  
        this.lineEdit = this.lines.find(Line => Line.Name == radioSelected);
  
        this.allStationLines.forEach(sl=>{
          if(sl.LineId==this.lineId)
            this.stationIds.push(sl.StationId);
        });
        

        this.stationIds.forEach(s=>{
          this.stationsDraw.push(this.allStations.find(x=>x.Id==s));
        });
  
        this.stationsDraw.forEach(s=>{
          this.polyline.addLocation(new GeoLocation(s.CoordinateX,s.CoordinateY));
        });
  }
  
  
  clickedMarker(point) {
    this.allStations.forEach(x=>{
      if(x.CoordinateX==point.latitude && x.CoordinateY==point.longitude){
        this.stationClicked = x;   
        this.stationEdit = x; 
        this.stationEditID = x.Id;
      }
    });
    this.editStation=true;
  }

  // save()
  // {
  //   if(this.bodyText!="")
  //   {

  //       this.polyline.addLocation(this.location)
  //       this.station=new Station();
  //       this.stationLine = new StationLine();
  //       this.station.Name = this.bodyText;
  //       this.station.Address = this.address;
  //       this.station.CoordinateX = this.location.latitude;
  //       this.station.CoordinateY = this.location.longitude;

  //       this.modalService.close('custom-modal-1');
  //       this.bodyText = '';
  //       this.postStation();
  // }
  // else{
  //   alert("You need to put station name");
  // }
  // }

  // postStation(){
  //   this.station.Address = this.address;
  //   this.lineService.postStation(this.station)
  //       .subscribe(
  //         data =>{
  //           this.stationId = data.Id;
  //           this.postStationLine();
  //          console.log("Poslata stanica.");
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       )
  // }

  // postStationLine(){
    
  //   this.stationLine.LineId = this.lineId;
  //   this.stationLine.StationId = this.stationId;
  //   this.lineService.postStationLine(this.stationLine)
  //       .subscribe(
  //         data =>{
  //          console.log("Poslata stationline.");
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       )
  // }

  // postLine(){
  //   this.lineService.postLine(this.line)
  //       .subscribe(
  //         data =>{
  //           this.lineId = data.Id;
  //          console.log("Poslata linija.");
  //          this.router.navigate(['/lines']).then(()=>window.location.reload()); 
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       )
  // }
  

  // openModal(id: string) {
  //  this.modalService.open(id);
  // }

  // closeModal(id: string) {
  // this.modalService.close(id);
  // }

  // createLine(){


  //   var i=this.lines.findIndex(x=>x.Name===this.bodyText1);

  //   if(this.bodyText1!="" && i==-1){
  //     this.polyline.path = [];
  //     this.stationIds = [];
  //     this.stationsDraw = [];
  //     this.line = new Line();
  //     this.line.Name = this.bodyText1;
  //     this.modalService.close('custom-modal-2');
  //     this.bodyText1 = "";
  //     this.postLine();
  //   }
  //   else if(i!=-1){
  //     alert("There is already line with that name");
  //   }
  //   else
  //    {
  //      alert("You need to put the name of a line");
  //    }

  // }



// UpdateLine()
//   {
//     var i=this.lineNames.findIndex(x=>x===this.lineEdit.Name);

//     if(i==-1 && this.lineEdit.Name!="")
//     {
//         this.lineService.putLine(this.lineId, this.lineEdit)
//         .subscribe(
//           data => {
//             //this.stations = data;  
        
//           },
//           error => {
//             console.log(error);
//           }
//         )

//         this.UpdateTimetable();
//         this.router.navigate(['/lines']).then(()=>window.location.reload());  
//         }
    
//     else
//     {
//         alert("You need to pick another name.");
//     }
//   }
// UpdateTimetable()
// {

//     this.check=this.radioSelected;
//     this.timetableServer.getTimetablebyLineid(this.check).subscribe(
//       data=>
//       {
//             this.timetables=data;

//             if(data!=null)
//               {  
//                   this.UpdateTimetable2();
//               }

//       }
//     )
//  }

//  UpdateTimetable2()
//  {
  
//       this.timetables.forEach(x=>x.LineId=this.lineEdit.Name);
      
//       this.timetables.forEach(
//         x=>
//           this.timetableServer.putTimeTable(x.Id,x).subscribe(
//             data=>
//           {

//           }
//           )         
//       )   
//  }
  // UpdateStation()
  // {
  //   this.lineService.putStation(this.stationEditID, this.stationEdit)
  //   .subscribe(
  //     data => {
  //       this.router.navigate(['/lines']).then(()=>window.location.reload());  
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
    
  // }

  // deleteLine(){

  //   if(this.radioSelected!="")
  //   {
  //       this.lineService.deleteLine(this.lineId)
  //       .subscribe(
  //         data => {
  //           console.log("OK");  
  //           this.router.navigate(['/lines']).then(()=>window.location.reload());   
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       )
  //    }
  //   else
  //   {
  //       alert("You need to check line that you want to delete");
  //   }
  // }

  // deleteStation(){
  //   this.lineService.deleteStation(this.stationEditID)
  //   .subscribe(
  //     data => {
  //       this.router.navigate(['/lines']).then(()=>window.location.reload());  
  //       console.log("OK");     
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  

  // Edit()
  // {
  //   if(this.radioSelected!="")
  //   {
  //     this.edit=true;
  //   }
  //   else
  //   {
  //     alert("You need to check some line if you want to edit it")
  //   }
  // }

}
