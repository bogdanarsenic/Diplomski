import * as fromReducer from './timetable.reducer';
import * as TimetableActions from './timetable.actions';
import { TimeTable } from 'src/app/shared/classes/TimeTable';

describe('Timetable Reducer',()=>{

    describe('SET_TIMETABLES',()=>
    {
        it('should set new timetables',()=>
        {
            const timetables:TimeTable[]=[
                { Id:"", Type:"",LineId:"",Day:"",Times:"" },
            ]
            const action=new TimetableActions.SetTimetables(timetables);

            const state=fromReducer.timetableReducer(fromReducer.initialState,action);

            expect(state.timetables).toEqual(timetables);
            expect(state.selectedTimetable).toBe(null);
        })
    }),
    describe('ADD_TIMETABLE',()=>
    {
        it('Success - should add new timetable and change selected timetable',()=>
        {
            const timetable:TimeTable= { Id:"", Type:"",LineId:"",Day:"",Times:""   }
            const action=new TimetableActions.AddTimetableSuccess(timetable);
            var state=fromReducer.timetableReducer(fromReducer.initialState,action);
            
            expect(state.timetables.length).toEqual(1);
            expect(state.selectedTimetable).toEqual(timetable);
        }),
        it('Failed - should return selected timetable and not to update timetables',()=>
        {
            const timetable:TimeTable= { Id:"", Type:"",LineId:"",Day:"",Times:""   }
            const action=new TimetableActions.AddTimetable(timetable);
            var state=fromReducer.timetableReducer(fromReducer.initialState,action);
            const action2=new TimetableActions.AddTimetableFailed();
            var state=fromReducer.timetableReducer(state,action2);
            
            expect(state.timetables.length).toEqual(0);
            expect(state.timetables).toEqual([]);
            expect(state.selectedTimetable).toEqual(timetable);
        })
    }),
    describe('EDIT_TIMETABLE',()=>
    {
        it('Success - should update existing timetable',()=>
        {
            const timetable:TimeTable= { Id:"", Type:"",LineId:"",Day:"",Times:""   }
            const action=new TimetableActions.AddTimetableSuccess(timetable);
            var state=fromReducer.timetableReducer(fromReducer.initialState,action);

            const newTimetable:TimeTable={Id:"",Type:"",LineId:"",Day:"",Times:"5:15;" }

            var index=0;
            const action2 = new TimetableActions.EditTimetableSuccess({index,newTimetable});

            state=fromReducer.timetableReducer(state,action2);

            expect(state.timetables[0]).not.toEqual(timetable);
            expect(state.timetables[0]).toEqual(newTimetable);
            expect(state.selectedTimetable).toEqual(newTimetable);
        }),
        it('Failed - should return that selected timetable with no changes',()=>
        {
            const timetable:TimeTable= { Id:"", Type:"",LineId:"",Day:"",Times:""   }
            const action=new TimetableActions.AddTimetableSuccess(timetable);
            var state=fromReducer.timetableReducer(fromReducer.initialState,action);

            const newTimetable:TimeTable={Id:"",Type:"",LineId:"",Day:"",Times:"5:15;" }

            var index=0;
            const action2 = new TimetableActions.EditTimetableFailed();

            state=fromReducer.timetableReducer(state,action2);

            expect(state.timetables[0]).not.toEqual(newTimetable);
            expect(state.timetables[0]).toEqual(timetable);
            expect(state.selectedTimetable).toEqual(timetable);
        })
    }),
    describe('DELETE_TIMETABLE',()=>
    {
        it('Success - should delete that timetable, and update timetables',()=>
        {
            const timetables:TimeTable[]= [{ Id:"", Type:"",LineId:"",Day:"",Times:""   },{ Id:"1", Type:"1",LineId:"1",Day:"1",Times:"1"   }]

            const timetable=timetables[1];

            const action=new TimetableActions.SetTimetables(timetables);
            var state=fromReducer.timetableReducer(fromReducer.initialState,action);


            const action2 = new TimetableActions.DeleteTimetableSuccess(1);

            state=fromReducer.timetableReducer(state,action2);

            expect(state.timetables[1]).not.toEqual(timetable);
            expect(state.timetables.length).toEqual(1);
            expect(state.selectedTimetable).not.toEqual(null);
        }),
        it('Failed - should return that selected timetable with no changes on timetables',()=>
        {
            const timetables:TimeTable[]= [{ Id:"", Type:"",LineId:"",Day:"",Times:""   },{ Id:"1", Type:"1",LineId:"1",Day:"1",Times:"1"   }]
            const selectedTimetable=timetables[1];

            const action=new TimetableActions.SetTimetables(timetables);
            var state=fromReducer.timetableReducer(fromReducer.initialState,action);

            var index=1;
            const action2 = new TimetableActions.DeleteTimetable({index,selectedTimetable});
            state=fromReducer.timetableReducer(state,action2);

            const action3=new TimetableActions.DeleteTimetableFailed();
            state=fromReducer.timetableReducer(state,action3);

            expect(state.timetables[1]).toEqual(selectedTimetable);
            expect(state.timetables.length).toEqual(2);
            expect(state.selectedTimetable).toEqual(selectedTimetable);
        })
    }),
    describe('SELECT_TIMETABLE',()=>
    {
        it('should return the selected timetable',()=>
        {
            const timetables:TimeTable[]=[ { Id:"", Type:"",LineId:"",Day:"",Times:""   } ]

            const action1=new TimetableActions.SetTimetables(timetables);
            var state=fromReducer.timetableReducer(fromReducer.initialState,action1);
    
            const action2 = new TimetableActions.SelectedTimetable(state.timetables[0]);
            state=fromReducer.timetableReducer(state,action2);

            expect(state.selectedTimetable).toEqual(state.timetables[0]);
        })
    }),
    describe('UNSELECT_TIMETABLE',()=>
    {
        it('should return null for the selected timetable',()=>
        {
            const timetables:TimeTable[]=[ { Id:"", Type:"",LineId:"",Day:"",Times:""   } ]

            const action1=new TimetableActions.SetTimetables(timetables);
            var state=fromReducer.timetableReducer(fromReducer.initialState,action1);
    
            const action2 = new TimetableActions.SelectedTimetable(state.timetables[0]);
            state=fromReducer.timetableReducer(state,action2);

            const action3 = new TimetableActions.UnSelectTimetable();
            state=fromReducer.timetableReducer(state,action3);

            expect(state.selectedTimetable).not.toEqual(state.timetables[0]);
            expect(state.selectedTimetable).toEqual(null);

        })
    }),
    describe('RESET_VALUES',()=>
    {
        it('should return the initial state',()=>
        {
            const timetables:TimeTable[]=[
                { Id:"", Type:"",LineId:"",Day:"",Times:""   },
            ]
            const action1=new TimetableActions.SetTimetables(timetables);
            var state=fromReducer.timetableReducer(fromReducer.initialState,action1);
    
            const action2 = new TimetableActions.ResetValues();

            state=fromReducer.timetableReducer(state,action2);

            expect(state.timetables).toEqual([]);
            expect(state.selectedTimetable).toEqual(null);
        })
    })
})