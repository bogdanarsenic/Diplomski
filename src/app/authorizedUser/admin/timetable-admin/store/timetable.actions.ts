import { Action } from '@ngrx/store';
import { TimeTable } from 'src/app/shared/classes/TimeTable';

export const SET_TIMETABLES='[Timetables] Set Timetables';
export const FETCH_TIMETABLES = '[Timetables] Fetch Timetables';

export const SELECTED_TIMETABLE='[Timetable] Selected Timetable';
export const UNSELECT_TIMETABLE='[Timetable] UnSelect Timetable';

export const RESET_VALUES = '[Timetable] Reset Values';

export const ADD_TIMETABLE='[Timetable] Add Timetable';
export const ADD_TIMETABLE_SUCCESS='[Timetable] Add Timetable Success';
export const ADD_TIMETABLE_FAILED='[Timetable] Add Timetable Failed';

export const EDIT_TIMETABLE='[Timetable] Edit Timetable';
export const EDIT_TIMETABLE_SUCCESS='[Timetable] Edit Timetable Success';
export const EDIT_TIMETABLE_FAILED='[Timetable] Edit Timetable Failed';

export const DELETE_TIMETABLE='[Timetable] Delete Timetable';
export const DELETE_TIMETABLE_SUCCESS='[Timetable] Delete Timetable Success';
export const DELETE_TIMETABLE_FAILED='[Timetable] Delete Timetable Failed';
;

export class AddTimetableSuccess implements Action {
    readonly type=ADD_TIMETABLE_SUCCESS;

    constructor(public payload:TimeTable)
    {}
}

export class AddTimetable implements Action {
  readonly type=ADD_TIMETABLE;
  constructor(public payload:TimeTable)
  {}
}

export class AddTimetableFailed implements Action {
  readonly type=ADD_TIMETABLE_FAILED;
}



export class FetchTimetables implements Action {
  readonly type = FETCH_TIMETABLES;
}

export class SetTimetables implements Action {
    readonly type=SET_TIMETABLES;

    constructor(public payload:TimeTable[])
    {}
}

export class EditTimetable implements Action {
    readonly type=EDIT_TIMETABLE;

    constructor(public payload:{ index:number, newTimetable:TimeTable})
    {}
}

export class EditTimetableSuccess implements Action {
  readonly type=EDIT_TIMETABLE_SUCCESS;

  constructor(public payload:{ index:number, newTimetable:TimeTable})
  {}
}

export class EditTimetableFailed implements Action {
  readonly type=EDIT_TIMETABLE_FAILED;
}

export class DeleteTimetable implements Action {
    readonly type=DELETE_TIMETABLE;

    constructor(public payload:{ index:number, selectedTimetable:TimeTable})
    {}
}

export class DeleteTimetableSuccess implements Action {
  readonly type=DELETE_TIMETABLE_SUCCESS;

  constructor(public payload:number)
  {}
}

export class DeleteTimetableFailed implements Action {
  readonly type=DELETE_TIMETABLE_FAILED;
}

  export class SelectedTimetable implements Action {
    readonly type = SELECTED_TIMETABLE;
  
    constructor(public payload: TimeTable) {}
  }

  export class UnSelectTimetable implements Action {
    readonly type = UNSELECT_TIMETABLE;
  }
  
  export class ResetValues implements Action {
    readonly type = RESET_VALUES;
  }

export type TimetableActions = 
      | AddTimetable
      | AddTimetableSuccess
      | SetTimetables
      | FetchTimetables
      | EditTimetable
      | EditTimetableFailed
      | EditTimetableSuccess
      | DeleteTimetable
      | DeleteTimetableSuccess
      | DeleteTimetableFailed
      | ResetValues
      | SelectedTimetable
      | UnSelectTimetable; //union type