export interface Config {
  color: string;
}
const INITIAL_STATE: Config = { color: 'red' };

export function ConfigReducer(state: Config = INITIAL_STATE, action: any ): any {
  switch (action.type) {
    case 'GET_CONFIG':
      return state;    // TIP: first time it returns the INITIAL_STATE
    case 'SET_THEME_COLOR':
      return Object.assign( {}, state,  action.payload );
    default: {
      return state;
    }
  }
}
