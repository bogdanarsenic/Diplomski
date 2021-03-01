import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarkerInfo } from './model/marker-info.model';
import { GeoLocation } from './model/geolocation';
import { Polyline } from './model/polyline';
import { MapsAPILoader } from '@agm/core';
import { Station } from '../../classes/Station';
import { Line } from '../../classes/Line';
import { StationLine } from '../../classes/StationLine';
import { Input } from '@angular/core';
import { LinesService } from '../lines.service';
import { LinesAdminService } from 'src/app/authorizedUser/admin/lines-admin/lines-admin.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 400px; width: 600px;}','app/shared/lines/map/modal.less'],
})
export class MapComponent implements OnInit, OnDestroy {

  
  markerInfo: MarkerInfo;
  polyline: Polyline;
  public zoom: number;
  showAdmin:boolean;  
  stationsDraw:Array<Station>=[];
  stationIds:Array<any>=[];
  private geoCoder;
  stationClicked:Station;
  location:GeoLocation;
  previous
  latMarker:number;
  longMarker:number;
  lineId:number;
  stationClickedLineId:number;

  @Input() vehicle:boolean
  @Input() lines:Line[]
  @Input() allStationLines:StationLine[]
  @Input() stations:Station[];

constructor(private lineService:LinesService, private lineAdminService:LinesAdminService,private mapsAPILoader:MapsAPILoader, private authService:AuthService){
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954,""), "assets/ftn.png", "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  }

  ngOnInit() {
    var google: any;
    this.showAdmin=this.authService.getRole()=="Admin"?true:false
    this.stationClicked=new Station();
    this.setVehicleMarker();

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  ngOnDestroy()
  {
    this.stationsDraw=[];
    this.lineService.DrawedStations.emit(this.stationsDraw)
    this.vehicle=false;
  }

  setVehicleMarker()
  {

    this.lineService.VehiclePosition.subscribe(
      data=>
        {       
            this.latMarker=data.CoordinateX;
            this.longMarker=data.CoordinateY;
        }
    )
  }

  placeMarker($event){

    if(this.showAdmin && !this.vehicle && this.lineId!=undefined)
    {
      this.getAddress($event.coords.lat, $event.coords.lng);
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 11;
          this.location = new GeoLocation(latitude, longitude, results[0].formatted_address);
          this.lineAdminService.SendAddressLocation.emit(this.location);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  addPolyline()
  {
    this.markerInfo = new MarkerInfo(this.location,
    "assets/bg.png",
    "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.polyline.addLocation(this.location);  
  }
  
  onItemChange(radioSelected:string)
  {

        this.latMarker=0;
        this.longMarker=0;
        this.polyline.path=[];
        this.stationsDraw = [];
        this.stationIds = [];
        this.lineId = this.lines.find(Line => Line.Name == radioSelected).Id;
        this.lineAdminService.TakeLineId.emit(this.lineId);   

        this.allStationLines.forEach(sl=>{
          if(sl.LineId==this.lineId)
            this.stationIds.push(sl.StationId);
        });
        
        this.stationIds.forEach(s=>{
          this.stationsDraw.push(this.stations.find(x=>x.Id==s));
        });
  
        this.stationsDraw.forEach(s=>{
          this.polyline.addLocation(new GeoLocation(s.CoordinateX,s.CoordinateY,""));
        });

        if(this.vehicle==true)
          this.lineService.DrawedStations.emit(this.stationsDraw)

        this.previous=undefined;
  }
  
  clickedMarker(point,infowindow) {

    this.stations.forEach(x=>{
      if(x.CoordinateX==point.latitude && x.CoordinateY==point.longitude){
        this.stationClicked = x;  
        this.stationClickedLineId=this.allStationLines.find(x=>x.StationId==String(this.stationClicked.Id)).LineId;
        this.stationClicked.LineId=this.lines.find(x=>x.Id==this.stationClickedLineId).Name;        
        this.lineAdminService.GetStation.emit(this.stationClicked);
      }
    });

    if (this.previous)
          this.previous.close();           
    this.previous = infowindow; 
  }

}
