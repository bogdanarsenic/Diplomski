import { TimeTable } from "src/app/shared/classes/TimeTable";
import * as TimetableActions from "./timetable.actions";

export interface State {
    timetables:TimeTable[];
    times:string[]

}

const initialState:State={
    timetables:[],
    times:[]
}


export function timetableReducer(state=initialState,action:TimetableActions.TimetableActions){
    switch(action.type)
    {
        case TimetableActions.ADD_TIMETABLE:
            return {
                ...state,
                timetables:[...state.timetables,action.payload]
            };

        case TimetableActions.ADD_TIMETABLES:
                return {
                    ...state,
                    timetables:[...state.timetables,...action.payload]
                };
        default:
            return state;
    }
}