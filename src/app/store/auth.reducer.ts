import { User } from '../model/user';
import { Auth } from '../store/auth.reducer';
export interface Auth {
  user: User;
  loginError: boolean;
  loginErrorCode: number;
}

const INITIAL_STATE: Auth = { user: JSON.parse(localStorage.getItem('user')), loginError: false, loginErrorCode: 0 };

export function AuthReducer(state: Auth = INITIAL_STATE, action: any): any {
  switch (action.type) {
    case 'LOGOUT':
      return Object.assign({}, state, { user: action.payload });
    case 'LOGIN':
      return Object.assign({}, state, { user: action.payload.user, loginError: action.payload.loginError,
        loginErrorCode: action.payload.loginErrorCode });
    default: {
      return state;
    }
  }
}
