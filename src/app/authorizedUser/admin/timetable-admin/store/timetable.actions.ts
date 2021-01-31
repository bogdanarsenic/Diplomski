import { Action } from '@ngrx/store';
import { TimeTable } from 'src/app/shared/classes/TimeTable';

export const ADD_TIMETABLE='ADD_TIMETABLE';
export const ADD_TIMETABLES='ADD_TIMETABLES';
export const EDIT_TIMETABLE='EDIT_TIMETABLE';
export const DELETE_TIMETABLE='DELETE_TIMETABLE';
export const ADD_TIMES='ADD_TIMES';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddTimetable implements Action {
    readonly type=ADD_TIMETABLE;

    constructor(public payload:TimeTable)
    {}
}

export class AddTimetables implements Action {
    readonly type=ADD_TIMETABLES;

    constructor(public payload:TimeTable[])
    {}
}

export class AddTimes implements Action {
    readonly type=ADD_TIMES;

    constructor(public payload:string[])
    {}
}


export class EditTimetable implements Action {
    readonly type=EDIT_TIMETABLE;

    constructor(public payload:TimeTable)
    {}
}

export class DeleteTimetable implements Action {
    readonly type=DELETE_TIMETABLE;

    constructor(public payload:TimeTable)
    {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
  
    constructor(public payload: number) {}
  }
  
  export class StopEdit implements Action {
    readonly type = STOP_EDIT;
  }

export type TimetableActions = 
      | AddTimetable
      | AddTimetables
      | AddTimes
      | EditTimetable
      | DeleteTimetable
      | StartEdit
      | StopEdit; //union type