import { TimeTable } from "src/app/shared/classes/TimeTable";
import * as TimetableActions from "./timetable.actions";

export interface State {
    timetables:TimeTable[];
    selectedTimetable:TimeTable;
}

const initialState:State={
    timetables:[],
    selectedTimetable:null
}

export function timetableReducer(state=initialState,action:TimetableActions.TimetableActions){
    switch(action.type)
    {
        case TimetableActions.ADD_TIMETABLE:
            return {
                ...state,
                timetables:[...state.timetables],
                selectedTimetable:action.payload
            };

        case TimetableActions.ADD_TIMETABLE_SUCCESS:
            return {
                ...state,
                timetables:[...state.timetables,action.payload],
                selectedTimetable:action.payload
            };

        case TimetableActions.EDIT_TIMETABLE:

                let selectedTimetable={...state.timetables[action.payload.index]};

                return {
                    ...state,
                    timetables:[...state.timetables],
                    selectedTimetable:selectedTimetable
                };
        
        case TimetableActions.EDIT_TIMETABLE_SUCCESS:

                const updatedTimetable={
                    ...state.timetables[action.payload.index],
                    ...action.payload.newTimetable
                };
                
                const updatedTimetables=[...state.timetables];
                updatedTimetables[action.payload.index]=updatedTimetable;

                return {
                    ...state,
                    timetables: updatedTimetables,
                    selectedTimetable:updatedTimetable
                };

        case TimetableActions.DELETE_TIMETABLE:
    
                    return {
                    ...state,
                    timetables: [...state.timetables],
                    selectedTimetable:action.payload.selectedTimetable
                    };

        case TimetableActions.DELETE_TIMETABLE_SUCCESS:

                        var timetableDeleted={...state.timetables[action.payload]}
                        timetableDeleted.Id=""
                        timetableDeleted.Times=""
        
                        return {
                        ...state,
                        timetables: state.timetables.filter((tt, ttIndex) => {
                                    return ttIndex !== action.payload;
                                    }),
                        selectedTimetable:timetableDeleted
                        };
        
        case TimetableActions.SELECTED_TIMETABLE:
            
            return {
                ...state,
                timetables:[...state.timetables],
                selectedTimetable:action.payload
            };

        case TimetableActions.SET_TIMETABLES:

                return {
                    ...state,
                    timetables:[...state.timetables,...action.payload],
                    selectedTimetable:null
                };

       
                
            case TimetableActions.RESET_VALUES:
                return {
                ...state,
                timetables:[],
                selectedTimetable:null

                };
                default:
                    return state;
    }
}