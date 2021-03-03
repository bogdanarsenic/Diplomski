import { TimeTable } from 'src/app/shared/classes/TimeTable';
import * as timetableAction from './timetable.actions';

describe('Timetable Actions',()=>{
  describe('SET_TIMETABLES', () => {
    it('should create an action', () => {

        const payload:TimeTable[]=[{ Id:"", Type:"", Day:"", LineId:"",Times:"" }]
        const action=new timetableAction.SetTimetables(payload);

        expect({...action}).toEqual({type:timetableAction.SET_TIMETABLES, payload})
    });
  });

  describe('FETCH_TIMETABLES', () => {
    it('should create an action', () => {
        const action=new timetableAction.FetchTimetables();
        expect({...action}).toEqual({type:timetableAction.FETCH_TIMETABLES});
    });
  });

  describe('SELECTED_TIMETABLE', () => {
    it('should create an action', () => {
        const payload:TimeTable={ Id:"", Type:"", Day:"", LineId:"",Times:""}
        const action=new timetableAction.SelectedTimetable(payload);

        expect({...action}).toEqual({type:timetableAction.SELECTED_TIMETABLE,payload})
    });
  });

  describe('UNSELECT_TIMETABLE', () => {
    it('should create an action', () => {
        const action=new timetableAction.UnSelectTimetable();
        expect({...action}).toEqual({type:timetableAction.UNSELECT_TIMETABLE});
    });
  });
  
  describe('ADD_TIMETABLE', () => {
    it('should create an action', () => {
        const payload:TimeTable={ Id:"", Type:"", Day:"", LineId:"",Times:""}
        const action=new timetableAction.AddTimetable(payload);

        expect({...action}).toEqual({type:timetableAction.ADD_TIMETABLE,payload})

    });
  });
  
  describe('ADD_TIMETABLE_SUCCESS', () => {
    it('should create an action', () => {
        const payload:TimeTable={ Id:"", Type:"", Day:"", LineId:"",Times:""}
        const action=new timetableAction.AddTimetableSuccess(payload);

        expect({...action}).toEqual({type:timetableAction.ADD_TIMETABLE_SUCCESS,payload})
    });
  });

  describe('ADD_TIMETABLE_FAILED', () => {
    it('should create an action', () => {
        const action=new timetableAction.AddTimetableFailed();
        expect({...action}).toEqual({type:timetableAction.ADD_TIMETABLE_FAILED});
    });
  });

  describe('EDIT_TIMETABLE', () => {
    it('should create an action', () => {
        const index=0;
        const newTimetable:TimeTable={ Id:"", Type:"", Day:"", LineId:"",Times:""}
        const action=new timetableAction.EditTimetable({index,newTimetable});

        expect({...action}).toEqual({type:timetableAction.EDIT_TIMETABLE,payload:{index,newTimetable}})
    });
  });
  
  describe('EDIT_TIMETABLE_SUCCESS', () => {
    it('should create an action', () => {
        const index=0;
        const newTimetable:TimeTable={ Id:"", Type:"", Day:"", LineId:"",Times:""}
        const action=new timetableAction.EditTimetableSuccess({index,newTimetable});

        expect({...action}).toEqual({type:timetableAction.EDIT_TIMETABLE_SUCCESS,payload:{index,newTimetable}})
    });
  });

  describe('EDIT_TIMETABLE_FAILED', () => {
    it('should create an action', () => {
        const action=new timetableAction.EditTimetableFailed();
        expect({...action}).toEqual({type:timetableAction.EDIT_TIMETABLE_FAILED});
    });
  });

  describe('DELETE_TIMETABLE', () => {
    it('should create an action', () => {
        const index=0;
        const selectedTimetable:TimeTable={ Id:"", Type:"", Day:"", LineId:"",Times:""}
        const action=new timetableAction.DeleteTimetable({index,selectedTimetable});

        expect({...action}).toEqual({type:timetableAction.DELETE_TIMETABLE,payload:{index,selectedTimetable}})
    });
  });
  
  describe('DELETE_TIMETABLE_SUCCESS', () => {
    it('should create an action', () => {
        const payload=0;
        const selectedTimetable:TimeTable={ Id:"", Type:"", Day:"", LineId:"",Times:""}
        const action=new timetableAction.DeleteTimetableSuccess(payload);

        expect({...action}).toEqual({type:timetableAction.DELETE_TIMETABLE_SUCCESS,payload})
    });
  });

  describe('DELETE_TIMETABLE_FAILED', () => {
    it('should create an action', () => {
        const action=new timetableAction.DeleteTimetableFailed();
        expect({...action}).toEqual({type:timetableAction.DELETE_TIMETABLE_FAILED});
    });
  });

  describe('RESET_VALUES', () => {
    it('should create an action', () => {
        const action=new timetableAction.ResetValues();
        expect({...action}).toEqual({type:timetableAction.RESET_VALUES});
    });
  });

})

