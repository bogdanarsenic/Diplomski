import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TimetableActions from './timetable.actions';
import { switchMap, catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { of } from 'rxjs';

@Injectable()
export class TimetableEffects {


    timetableLoading$= createEffect(() =>this.actions$.pipe(
        ofType(TimetableActions.FETCH_TIMETABLES),
        switchMap(()=>{
            return this.http
                .get<TimeTable[]>(
                'https://localhost:44306/api/Timetable'
                )
                .pipe(
                    map(timetables=>{
                        return new TimetableActions.SetTimetables(timetables);
                    }),
                    catchError(errorRes=>{
                        console.log(errorRes);
                            return of(new TimetableActions.ResetValues());
                    })
                )
        })   
     ));
    
     timetableAdd$= createEffect(() =>this.actions$.pipe(
        ofType(TimetableActions.ADD_TIMETABLE),
        switchMap((action:TimetableActions.AddTimetable) => {

            return this.http
                .post<TimeTable>(
                    "https://localhost:44306/api/Timetable", action.payload
                    )
                                
                .pipe(
                    map(timetable=>{
                        return new TimetableActions.AddTimetableSuccess(timetable);
                    }),
                    catchError(errorRes=>{
                            console.log(errorRes);
                            return of(new TimetableActions.AddTimetableFailed());
                    })
                )
        })   
     ));

     timetableEdit$= createEffect(() =>this.actions$.pipe(
        ofType(TimetableActions.EDIT_TIMETABLE),
        switchMap((action:TimetableActions.EditTimetable) => {

            return this.http.
                    put("https://localhost:44306/api/Timetable"+`/${action.payload.newTimetable.Id}`, action.payload.newTimetable
                )
                                
                .pipe(
                    map(()=>{
                        return new TimetableActions.EditTimetableSuccess(action.payload);
                    }),
                    catchError(errorRes=>{
                            console.log(errorRes);
                            return of(new TimetableActions.EditTimetableFailed());
                    })
                )
        })   
     ));

     timetableDelete$= createEffect(() =>this.actions$.pipe(
        ofType(TimetableActions.DELETE_TIMETABLE),
        switchMap((action:TimetableActions.DeleteTimetable) => {

            return this.http
                    .delete("https://localhost:44306/api/Timetable"+`/${action.payload.selectedTimetable.Id}`)
                                
                    .pipe(
                        map(()=>{
                            return new TimetableActions.DeleteTimetableSuccess(action.payload.index);
                        }),
                        catchError(errorRes=>{
                                console.log(errorRes);
                                return of(new TimetableActions.DeleteTimetableFailed());
                        })
                    )
            })   
     ));
    
    constructor(private actions$:Actions, private http:HttpClient) {}
}