export interface Timebar {
  timeslices: any[];
  selectedTimeslice: number;
  timebarLoading: boolean;
}

const DEFAULTS: Timebar = {
  timeslices: [],
  selectedTimeslice: null,
  timebarLoading: false
};

export function TimebarReducer(state: Timebar = DEFAULTS, action: any ): any {

  switch (action.type) {

    case 'LOADING_TIMEBAR':
      return Object.assign( {}, state, { selectedTimeslice: null, timeslices: [], timebarLoading: true } );

    case 'LOAD_TIMEBAR':
      const timebar = { selectedTimeslice: action.payload.selectedTimeslice, timeslices: action.payload.timeslices, timebarLoading: false };
      return Object.assign( {}, state, timebar );

    case 'SELECT_TIMESLICE':
      return Object.assign( {}, state, { selectedTimeslice: action.payload } );

    default: {
      return state;
    }
  }
}
