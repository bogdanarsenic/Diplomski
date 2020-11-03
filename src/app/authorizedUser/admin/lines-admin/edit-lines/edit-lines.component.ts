import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Line } from 'src/app/shared/classes/Line';
import { Station } from 'src/app/shared/classes/Station';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';
import { LinesAdminService } from '../lines-admin.service';

@Component({
  selector: 'app-edit-lines',
  templateUrl: './edit-lines.component.html',
  styleUrls: ['./edit-lines.component.css']
})
export class EditLinesComponent implements OnInit {

  radioSelected:string;
  timetables:TimeTable[];
  stationEdit:Station;
  editStation:boolean;
  edit:boolean;
  lineEdit:Line;
  lineId:number;

  @Input() lines:Line[];
  @Input() station:Station;
  

  constructor(private lineAdminService:LinesAdminService,private timetableService:TimetableService,private router:Router) { }

  ngOnInit() {
    this.editStation=false;

  }

  TakeLine(lineId:number)
  {
    this.lineId=lineId;
    this.lineEdit=this.lines.find(x=>x.Id==lineId);
    this.editStation=false;
  }

  GetStation(station:Station)
  {
      this.editStation=true;
      this.stationEdit=station;
  }
  
  UpdateLine()
  {
    var i=this.lines.findIndex(x=>x.Id===this.lineId);

    if(i==-1 && this.lineEdit.Name!="")
    {
        this.lineAdminService.putLine(this.lineId, this.lineEdit)
        .subscribe(
          data => {
        
          },
          error => {
            console.log(error);
          }
        )

        this.UpdateTimetable();
        this.router.navigate(['/lines']).then(()=>window.location.reload());  
        }
    
    else
    {
        alert("You need to pick another name.");
    }
  }
UpdateTimetable()
{

    this.timetableService.getTimetablebyLineid(String(this.lineId)).subscribe(
      data=>
      {
            this.timetables=data;

            if(data!=null)
              {  
                  this.UpdateTimetable2();
              }
      }
    )
 }

 UpdateTimetable2()
 {
  
      this.timetables.forEach(x=>x.LineId=this.lineEdit.Name);
      
      this.timetables.forEach(
        x=>
          this.timetableService.putTimeTable(x.Id,x).subscribe(
            data=>
          {

          }
          )         
      )   
 }
  UpdateStation()
  {
    this.lineAdminService.putStation(this.stationEdit.Id, this.stationEdit)
    .subscribe(
      data => {
        this.router.navigate(['/lines']).then(()=>window.location.reload());  
      },
      error => {
        console.log(error);
      }
    )
    
  }

  deleteLine(){

    if(this.radioSelected!="")
    {
        this.lineAdminService.deleteLine(this.lineId)
        .subscribe(
          data => {
            console.log("OK");  
            this.router.navigate(['/lines']).then(()=>window.location.reload());   
          },
          error => {
            console.log(error);
          }
        )
     }
    else
    {
        alert("You need to check line that you want to delete");
    }
  }

  deleteStation(){
    this.lineAdminService.deleteStation(this.stationEdit.Id)
    .subscribe(
      data => {
        this.router.navigate(['/lines']).then(()=>window.location.reload());  
        console.log("OK");     
      },
      error => {
        console.log(error);
      }
    )
  }
  
  Edit()
  {
    this.edit=true;
  }

}
