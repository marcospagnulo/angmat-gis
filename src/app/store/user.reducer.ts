import { User } from '../model/user';

const INITIAL_STATE: User = JSON.parse(localStorage.getItem('user'));

export function UserReducer(state: User = INITIAL_STATE, action: any ): any {
  switch (action.type) {
    case 'LOGOUT':
      return null;
    case 'LOGIN':
      return Object.assign( {}, state,  action.payload );
    default: {
      return state;
    }
  }
}
