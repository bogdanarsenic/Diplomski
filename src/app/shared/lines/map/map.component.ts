import { Component, OnInit } from '@angular/core';
import { MarkerInfo } from './model/marker-info.model';
import { GeoLocation } from './model/geolocation';
import { Polyline } from './model/polyline';
import { MapsAPILoader } from '@agm/core';
import { CommonModule } from '@angular/common';
import { Station } from '../../classes/Station';
import { Line } from '../../classes/Line';
import { StationLine } from '../../classes/StationLine';
import { Input } from '@angular/core';
import { LinesService } from '../lines.service';
import { LinesAdminService } from 'src/app/authorizedUser/admin/lines-admin/lines-admin.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 400px; width: 600px;}','app/shared/lines/map/modal.less'],
})
export class MapComponent implements OnInit {

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

  vehicle:boolean
  @Input() lines:Line[]
  @Input() allStationLines:StationLine[]
  @Input() allStations:Station[];

constructor(private lineService:LinesService, private lineAdminService:LinesAdminService,private mapsAPILoader:MapsAPILoader){
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954,""), "assets/ftn.png", "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  }

  ngOnInit() {
    
    this.vehicle=false;
    this.showAdmin=localStorage.role=="Admin"?true:false
    this.stationClicked=new Station();

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  setVehicleMarker(latMarker:number,longMarker:number)
  {
    this.latMarker=latMarker
    this.longMarker=longMarker;
  }
  onVehicle()
  {
    this.vehicle=true;
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
        this.setVehicleMarker(0,0);
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
          this.stationsDraw.push(this.allStations.find(x=>x.Id==s));
        });
  
        this.stationsDraw.forEach(s=>{
          this.polyline.addLocation(new GeoLocation(s.CoordinateX,s.CoordinateY,""));
        });

        if(this.vehicle)
          this.lineService.DrawedStations.emit(this.stationsDraw)

        this.previous=undefined;
  }
  
  clickedMarker(point,infowindow) {

    this.allStations.forEach(x=>{
      if(x.CoordinateX==point.latitude && x.CoordinateY==point.longitude){
        this.stationClicked = x;  
        this.lineAdminService.GetStation.emit(this.stationClicked);
      }
    });

    if (this.previous)
          this.previous.close();           
    this.previous = infowindow; 
  }

}
