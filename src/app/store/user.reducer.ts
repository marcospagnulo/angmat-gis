import { User } from '../model/user';

const INITIAL_STATE: User = null;

export function UserReducer(state: User = INITIAL_STATE, action: any ): any {
  switch (action.type) {
    case 'LOGOUT':
      return INITIAL_STATE;
    case 'LOGIN':
      return Object.assign( {}, state,  action.payload );
    default: {
      return state;
    }
  }
}
