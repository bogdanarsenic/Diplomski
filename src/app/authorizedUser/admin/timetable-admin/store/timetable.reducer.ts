import { TimeTable } from "src/app/shared/classes/TimeTable";
import * as TimetableActions from "./timetable.actions";

export interface State {
    timetables:TimeTable[];
    editedTimetable: TimeTable;
    editedTimetableIndex: number;
    selectedTimetable:TimeTable;
}

const initialState:State={
    timetables:[],
    editedTimetable: null,
    editedTimetableIndex: -1,
    selectedTimetable:null
}

export function timetableReducer(state=initialState,action:TimetableActions.TimetableActions){
    switch(action.type)
    {
        case TimetableActions.ADD_TIMETABLE:
            return {
                ...state,
                timetables:[...state.timetables,action.payload],
                editedTimetable: null,
                editedTimetableIndex: -1,
                selectedTimetable:action.payload
            };
        
        case TimetableActions.SELECTED_TIMETABLE:
            const selectedTimetable=action.payload;

            return {
                ...state,
                timetables:[...state.timetables],
                editedTimetable:null,
                editedTimetableIndex:-1,
                selectedTimetable:selectedTimetable
            };

        case TimetableActions.ADD_TIMETABLES:

                return {
                    ...state,
                    timetables:[...state.timetables,...action.payload],
                    editedTimetable: null,
                    editedTimetableIndex: -1,
                    selectedTimetable:null
                };


        case TimetableActions.EDIT_TIMETABLE:
                const timetable=state.timetables[state.editedTimetableIndex];

                const updatedTimetable={
                    ...timetable,
                    ...action.payload
                };
                
                const updatedTimetables=[...state.timetables];
                updatedTimetables[state.editedTimetableIndex]=updatedTimetable;

                return {
                    ...state,
                    timetables: updatedTimetables,
                    editedTimetable: null,
                    editedTimetableIndex: -1,
                    selectedTimetable:updatedTimetable
                };
        case TimetableActions.DELETE_TIMETABLE:

                var timetableDeleted={...state.timetables[state.editedTimetableIndex]}
                timetableDeleted.Id=""
                timetableDeleted.Times=""

                return {
                ...state,
                timetables: state.timetables.filter((tt, ttIndex) => {
                            return ttIndex !== state.editedTimetableIndex;
                            }),
                editedTimetable: null,
                editedTimetableIndex: -1,
                selectedTimetable:timetableDeleted
      };
      case TimetableActions.START_EDIT:
        return {
          ...state,
          editedTimetableIndex: action.payload,
          editedTimetable: { ...state.timetables[action.payload] },
          selectedTimetable:{...state.timetables[action.payload]}
        };
        
      case TimetableActions.RESET_VALUES:
        return {
          ...state,
          timetables:[],
          editedTimetable: null,
          editedTimetableIndex: -1,
          selectedTimetable:null

        };
        default:
            return state;
    }
}