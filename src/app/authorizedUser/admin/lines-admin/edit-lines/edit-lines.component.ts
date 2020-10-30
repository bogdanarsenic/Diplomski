import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Line } from 'src/app/shared/classes/Line';
import { Station } from 'src/app/shared/classes/Station';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { LinesService } from 'src/app/shared/lines/lines.service';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';

@Component({
  selector: 'app-edit-lines',
  templateUrl: './edit-lines.component.html',
  styleUrls: ['./edit-lines.component.css']
})
export class EditLinesComponent implements OnInit {

  lineNames:string[];
  lineEdit:Line;
  lineId:number;
  check:string;
  radioSelected:string;
  timetables:TimeTable[];
  stationEditID:number;
  stationEdit:Station;
  editStation:boolean;
  edit:boolean;


  constructor(private lineService:LinesService,private timetableService:TimetableService,private router:Router) { }

  ngOnInit(): void {
  }

  UpdateLine()
  {
    var i=this.lineNames.findIndex(x=>x===this.lineEdit.Name);

    if(i==-1 && this.lineEdit.Name!="")
    {
        this.lineService.putLine(this.lineId, this.lineEdit)
        .subscribe(
          data => {
            //this.stations = data;  
        
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

    this.check=this.radioSelected;
    this.timetableService.getTimetablebyLineid(this.check).subscribe(
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
    this.lineService.putStation(this.stationEditID, this.stationEdit)
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
        this.lineService.deleteLine(this.lineId)
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
    this.lineService.deleteStation(this.stationEditID)
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
    if(this.radioSelected!="")
    {
      this.edit=true;
    }
    else
    {
      alert("You need to check some line if you want to edit it")
    }
  }

}
