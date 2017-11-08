import { User } from '../model/user';
import { Auth } from '../store/auth.reducer';
export interface Auth {
  user: User;
  loginError: boolean;
}

const INITIAL_STATE: Auth = { user: JSON.parse(localStorage.getItem('user')), loginError: false};

export function AuthReducer(state: Auth = INITIAL_STATE, action: any ): any {
  switch (action.type) {
    case 'LOGIN_ERROR':
    return Object.assign( {}, state,  {loginError: action.payload} );
    case 'LOGOUT':
      return Object.assign( {}, state,  {user: action.payload} );
    case 'LOGIN':
      return Object.assign( {}, state,  {user: action.payload.user, loginError: false} );
    default: {
      return state;
    }
  }
}
