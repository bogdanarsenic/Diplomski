import { Component, OnInit } from '@angular/core';
import { MarkerInfo } from './model/marker-info.model';
import { GeoLocation } from './model/geolocation';
import { Polyline } from './model/polyline';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Station } from '../../classes/Station';
import { Line } from '../../classes/Line';
import { StationLine } from '../../classes/StationLine';
import { ModalService } from 'src/app/services/modal.service';
import { Input } from '@angular/core';
import { LinesService } from '../lines.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}','app/shared/lines/map/modal.less'],
})
export class MapComponent implements OnInit {

  markerInfo: MarkerInfo;
  @Input() polyline: Polyline;
  public zoom: number;
  showAdmin:boolean;  
  stationsDraw:Array<Station>=[];
  stationIds:Array<any>=[];
  private geoCoder;
  address:string;
  stationClicked:Station;
  location:GeoLocation;
  previous
  latMarker:number;
  longMarker:number;

  @Input() vehicle:boolean

  @Input() lines:Line[]
  @Input() allStationLines:StationLine[]
  @Input() allStations:Station[];

constructor(private lineService:LinesService,private mapsAPILoader:MapsAPILoader,private router:Router){
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), "assets/ftn.png", "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  }

  ngOnInit() {

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

  placeMarker($event){

    if(this.showAdmin)
    {
      this.getAddress($event.coords.lat, $event.coords.lng);
      this.location = new GeoLocation($event.coords.lat, $event.coords.lng);
      this.markerInfo = new MarkerInfo(new GeoLocation($event.coords.lat, $event.coords.lng),
        "assets/bg.png",
        "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
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
  
        var lineId = this.lines.find(Line => Line.Name == radioSelected).Id;
    
        this.allStationLines.forEach(sl=>{
          if(sl.LineId==lineId)
            this.stationIds.push(sl.StationId);
        });
        
        this.stationIds.forEach(s=>{
          this.stationsDraw.push(this.allStations.find(x=>x.Id==s));
        });
  
        this.stationsDraw.forEach(s=>{
          this.polyline.addLocation(new GeoLocation(s.CoordinateX,s.CoordinateY));
        });

        if(this.vehicle)
        this.lineService.DrawedStations.emit(this.stationsDraw)

        this.previous=undefined;
  }
  
  clickedMarker(point,infowindow) {

    this.allStations.forEach(x=>{
      if(x.CoordinateX==point.latitude && x.CoordinateY==point.longitude){
        this.stationClicked = x;   
      }
    });

    if (this.previous)
     {
          this.previous.close();      
     }
     
    this.previous = infowindow; 
  }

}
