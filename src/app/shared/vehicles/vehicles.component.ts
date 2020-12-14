import { Component, OnInit, NgZone,ViewChild, OnDestroy } from '@angular/core';
import { Station } from '../classes/Station';
import { NotificationService } from 'src/app/services/notification.service';
import { LinesComponent } from '../lines/lines.component';
import { LinesService } from '../lines/lines.service';
import { Line } from '../classes/Line';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})

export class VehiclesComponent implements OnInit, OnDestroy {

  @ViewChild(LinesComponent, { static: false }) childLines:LinesComponent 
  
  public zoom: number;
  stationsToDraw:Array<Station> = [];
  num:number=0;
  latMarker:number;
  longMarker:number;
  isConnected: Boolean;
  time: string;
  line:Line
  isVehicle:boolean;  
  
  constructor(private ngZone: NgZone,private notifService: NotificationService,private lineService:LinesService) { 

    this.isConnected = false;
    this.isVehicle=true;

  }

  ngOnInit() {
        this.onItemChange();
  }

  ngOnDestroy()
  { 
    this.isVehicle=false;
    if(this.isConnected)
        this.stopTimer();
        
    this.isConnected=false;   
  }


  onItemChange(){

    this.lineService.DrawedStations.subscribe(
      x=>
      {
        if(x.length!=0)
        {
          this.stationsToDraw=x;
          if(this.isConnected==false)
          { 
            this.checkConnection();
          }
        }

      }
    )
  }

  private checkConnection(){
   this.notifService.startConnection().subscribe(e => {this.isConnected = e; 
        if (e) {

          this.notifService.StartTimer();
          this.subscribeForTime();
        }
    });
  }

  subscribeForTime() {
    this.notifService.notificationReceived.subscribe(e => 
      {
           this.onTimeEvent(e);
      });

  }

  public onTimeEvent(time: string){

      this.ngZone.run(() => {   
        
          if(this.time!=time)
          {
            this.time = time;  
            this.num++;
            if(this.num>this.stationsToDraw.length -1)
                this.num = 0;  

            this.lineService.VehiclePosition.emit(this.stationsToDraw[this.num]);
          }
           
      });

  }

  public stopTimer() {
    this.notifService.StopTimer();
    this.time = "";
  }
}