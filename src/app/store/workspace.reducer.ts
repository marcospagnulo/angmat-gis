import { WorkspaceActions } from '../actions/workspace.actions';
import { Devices } from '../model/device';

const DEFAULTS: Devices = { list: [], active: null };

export function WorkspaceReducer(state: Devices = DEFAULTS, action: any): any {

  let active, list;

  switch (action.type) {

    case WorkspaceActions.DEVICES_GET:
      return Object.assign({}, state, { list: action.payload.list });

    case WorkspaceActions.DEVICES_SET_ACTIVE:
      active = state.list.find(({id}) => id === action.payload.id );
      return Object.assign({}, state, { active });

    case WorkspaceActions.DEVICES_DELETE:
      list = state.list.filter(({ id }) => id !== action.payload.id);
      return Object.assign({}, state, { list });

    case WorkspaceActions.DEVICES_RESET:
      return Object.assign({}, state, { active: { os: null } });

    case WorkspaceActions.DEVICES_ADD:
      list = state.list.concat(action.payload.device);
      return Object.assign({}, state, { list });

    case WorkspaceActions.DEVICES_UPDATE:
      list = state.list.map(item => {
        if (item.id === action.payload.device.id) {
          return action.payload.device;
        }
        return item;
      });
      return Object.assign({}, state, { list });

    default:
      return state;
  }
}
