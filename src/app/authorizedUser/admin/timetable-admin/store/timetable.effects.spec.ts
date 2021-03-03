import { Action } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from "@angular/core/testing";
import { TimetableEffects } from './timetable.effects';
import { TimetableService } from "src/app/shared/timetable/timetable.service";
import { TimeTable } from "src/app/shared/classes/TimeTable";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResetValues } from "./timetable.actions";




describe('Timetable Effects',()=>{
    let effects:TimetableEffects;
    let actions$ = new Observable<Action>();
    let timetableServiceSpy: jasmine.SpyObj<TimetableService>;
    
    beforeEach(()=>
    {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule ],
            providers: [
                TimetableEffects,
                provideMockActions(() => actions$),
                {provide:TimetableService,useValue:jasmine.createSpyObj('TimetableService',['getAllTimetables','postTimetable','putTimeTable','deleteTimeTable'])}
            ],
          });

        effects = TestBed.get(TimetableEffects);
        timetableServiceSpy = TestBed.inject(TimetableService) as jasmine.SpyObj<TimetableService>;
        
    })

    describe('Fetch Timetables',()=>{
        it('Should return [Timetables] Set Timetables type and payload with inserted timetable values',()=>{

            actions$=of({type:'[Timetables] Fetch Timetables'});
    
            const timetable:TimeTable= { Id:"", Type:"",LineId:"",Day:"",Times:""   }
    
            timetableServiceSpy.getAllTimetables.and.returnValue(of([timetable]));
    
            effects.timetableLoading$.subscribe(action => {
                expect(action).toEqual({
                  type: '[Timetables] Set Timetables',payload:[timetable]
                });
            }) 
               
        })
        it('Should return [Timetables] Reset Values type with empty payload',()=>{
            
            actions$=of({type:'[Timetables] Fetch Timetables'});
    
            timetableServiceSpy.getAllTimetables.and.returnValue(throwError({status: 404}));
    
            effects.timetableLoading$.subscribe(action => {
                expect(action.type).toEqual('[Timetable] Reset Values');
            })   
        })
    }),
    describe('Add Timetable',()=>{
        it('Should return [Timetable] Add Timetable Success type and payload with inserted timetable values',()=>{

            actions$=of({type:'[Timetable] Add Timetable'});
    
            const timetable:TimeTable= { Id:"", Type:"",LineId:"",Day:"",Times:""   }
    
            timetableServiceSpy.postTimetable.and.returnValue(of([timetable]));
    
            effects.timetableAdd$.subscribe(action => {
                expect(action).toEqual({
                  type: '[Timetable] Add Timetable Success',payload:[timetable]
                });
            })    
        }),
        it('Should return [Timetable] Add Timetable Failed type with no new changes',()=>{
            
            actions$=of({type:'[Timetable] Add Timetable'});
    
            timetableServiceSpy.postTimetable.and.returnValue(throwError({status: 404}));
    
            effects.timetableAdd$.subscribe(action => {
                expect(action.type).toEqual('[Timetable] Add Timetable Failed')    
        })
    })
    })
    describe('Edit Timetable',()=>{
        it('Should return [Timetable] Edit Timetable Success type and payload with changed timetable values',()=>{

            let index=0
            const newTimetable:TimeTable= { Id:"", Type:"",LineId:"",Day:"",Times:""   }

            actions$=of({type:'[Timetable] Edit Timetable',payload:{index:index,newTimetable:newTimetable}});
         
            timetableServiceSpy.putTimeTable.and.returnValue(of(index,newTimetable));
    
            effects.timetableEdit$.subscribe(action => {
                expect(action).toEqual({
                  type: '[Timetable] Edit Timetable Success',
                  payload:{index,newTimetable}
                });
            })    
        })
        it('Should return [Timetable] Edit Timetable Failed type with no new changes',()=>{
            
            let index=0
            const newTimetable:TimeTable= { Id:"", Type:"",LineId:"",Day:"",Times:""   }

            actions$=of({type:'[Timetable] Edit Timetable',payload:{index:index,newTimetable:newTimetable}});
    
            timetableServiceSpy.putTimeTable.and.returnValue(throwError({status: 404}));
    
            effects.timetableEdit$.subscribe(action => {
                expect(action.type).toEqual('[Timetable] Edit Timetable Failed')
                });  
        })
    })

    describe('Delete Timetable',()=>{

      

        it('Should return [Timetable] Delete Timetable Success type and payload with index',()=>{
        
            const selectedTimetable:TimeTable= { Id:"", Type:"",LineId:"",Day:"",Times:""   }
            let index=0
    
            actions$=of({type:'[Timetable] Delete Timetable',payload:{index:index,selectedTimetable:selectedTimetable}});

            timetableServiceSpy.deleteTimeTable.and.returnValue(of(index));
    
            effects.timetableDelete$.subscribe(action => {
                expect(action).toEqual({
                  type: '[Timetable] Delete Timetable Success',
                  payload:index
                });
            })    
        }),
        it('Should return [Timetable] Delete Timetable Failed type with no new changes',()=>{
            
            const selectedTimetable:TimeTable= { Id:"", Type:"",LineId:"",Day:"",Times:""   }
            let index=0
    
            actions$=of({type:'[Timetable] Delete Timetable',payload:{index:index,selectedTimetable:selectedTimetable}});
            
            timetableServiceSpy.deleteTimeTable.and.returnValue(throwError({status: 404}));
    
            effects.timetableDelete$.subscribe(action => {
                expect(action.type).toEqual('[Timetable] Delete Timetable Failed')
            })    
        })
    })
})


