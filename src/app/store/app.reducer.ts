import { ActionReducerMap } from '@ngrx/store'; 
//import * as fromAuth from '../auth/store/auth.reducer';
import * as fromTimetable from '../authorizedUser/admin/timetable-admin/store/reducerTmt';


export interface AppState {
  //  auth:fromAuth.State;
    timetable:fromTimetable.State;
}

export const appReducer: ActionReducerMap<AppState> = {
   // auth:fromAuth.authReducer,
    timetable:fromTimetable.timetableReducer
};

