import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TimetableActions from './timetable.actions';
import { catchError, map, mergeMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TimetableService } from 'src/app/shared/timetable/timetable.service';

@Injectable()

export class TimetableEffects {
    constructor(private actions$:Actions, private timetableService:TimetableService) {}


    timetableLoading$= createEffect(() =>this.actions$.pipe(
        ofType(TimetableActions.FETCH_TIMETABLES),
        mergeMap(()=>
                this.timetableService.getAllTimetables()
                .pipe(
                    map(timetables=>
                        ({ type: '[Timetables] Set Timetables', payload: timetables })),
                    catchError(errorRes=>{
                        console.log(errorRes);
                            return of(new TimetableActions.ResetValues());
                    })
                )
        )   
     ));
    
     timetableAdd$= createEffect(() =>this.actions$.pipe(
        ofType(TimetableActions.ADD_TIMETABLE),
        mergeMap((action:TimetableActions.AddTimetable) =>
                    this.timetableService.postTimetable(action.payload)     
                .pipe(
                    map(timetable=>
                        ({ type: '[Timetable] Add Timetable Success', payload: timetable })),
                    catchError(errorRes=>{
                            console.log(errorRes);
                            return of(new TimetableActions.AddTimetableFailed());
                    })
                )
        )
    ));  


     timetableEdit$= createEffect(() =>this.actions$.pipe(
        ofType(TimetableActions.EDIT_TIMETABLE),
        mergeMap((action:TimetableActions.EditTimetable) =>
            this.timetableService.putTimeTable(action.payload.newTimetable.Id,action.payload.newTimetable)     
                .pipe(
                        map(()=>
                            ({ type: '[Timetable] Edit Timetable Success', payload: action.payload })),
                        catchError(errorRes=>{
                                console.log(errorRes);
                                return of(new TimetableActions.EditTimetableFailed());
                        })
                )
        )  
    ));

     timetableDelete$= createEffect(() =>this.actions$.pipe(
        ofType(TimetableActions.DELETE_TIMETABLE),
        mergeMap((action:TimetableActions.DeleteTimetable) =>
        this.timetableService.deleteTimeTable(action.payload.selectedTimetable.Id)     
            .pipe(
                    map(()=>
                        ({ type: '[Timetable] Delete Timetable Success', payload: action.payload.index })),
                    catchError(errorRes=>{
                            console.log(errorRes);
                            return of(new TimetableActions.DeleteTimetableFailed());
                    })
            )
    )  
     ));
    
}