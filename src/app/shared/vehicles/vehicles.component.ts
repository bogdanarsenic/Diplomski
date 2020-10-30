import { Component, OnInit, NgZone,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Station } from '../classes/Station';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpClickService } from 'src/app/services/click-http.service';
import { MarkerInfo } from '../lines/map/model/marker-info.model';
import { Polyline } from '../lines/map/model/polyline';
import { GeoLocation } from '../lines/map/model/geolocation';
import { LinesComponent } from '../lines/lines.component';
import { LinesService } from '../lines/lines.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  styles: ['agm-map {height: 500px; width: 1000px;}'], //postavljamo sirinu i visinu mape
})

export class VehiclesComponent implements OnInit {

  @ViewChild(LinesComponent, { static: false }) childC:LinesComponent 
  markerInfo: MarkerInfo;
  public polyline: Polyline;
  public zoom: number;
  stationsToDraw:Array<Station> = [];
  num:number = 0;
  latMarker:number;
  longMarker:number;
  isConnected: Boolean;
  notifications: string[];
  time: string;
  
  constructor(private ngZone: NgZone,private notifService: NotificationService, private http: HttpClickService,private lineService:LinesService) { 

    this.isConnected = false;
    this.notifications = [];

    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954),
      "assets/ftn.png",
      "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");

    this.polyline = new Polyline([], 'blue', { url: "assets/busicon.png", scaledSize: { width: 50, height: 50 } });
  }

  ngOnInit() {

    this.checkConnection();
    this.subscribeForNotifications();
    this.notifService.startConnection();

    setTimeout(()=>
    {
      this.childC.onVehicle()
      this.onItemChange();
    },1000)

  }

  onItemChange(){

    this.lineService.DrawedStations.subscribe(
      x=>
      {
        this.stationsToDraw=x;
        if(x!=undefined)
        {
          this.onClick();
          this.subscribeForTime();
        }
      }
    )
  }

  private checkConnection(){
    this.notifService.startConnection().subscribe(e => {this.isConnected = e; 
        if (e) {
          this.notifService.StartTimer();
        }
    });
  }

  private subscribeForNotifications () {
    this.notifService.notificationReceived.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: string) {
     this.ngZone.run(() => { 
       this.notifications.push(notif);  
       console.log(this.notifications);
    });  
  }

  subscribeForTime() {
    this.notifService.registerForTimerEvents().subscribe(e => this.onTimeEvent(e));
  }

  public onTimeEvent(time: string){

    this.ngZone.run(() => { 
    this.time = time;  
    this.latMarker = this.stationsToDraw[this.num].CoordinateX;
    this.longMarker = this.stationsToDraw[this.num].CoordinateY;
    this.num = this.num + 1;
    if(this.num>this.stationsToDraw.length -1)
        this.num = 0;     
        this.childC.Marker(this.latMarker,this.longMarker);
    });  
  }

  public onClick() {
    if (this.isConnected) {
      this.http.click().subscribe(data => {
      });
    }
  } 

  public startTimer() {
    this.notifService.StartTimer();
  }

  public stopTimer() {
    this.notifService.StopTimer();
    this.time = "";
  }
}