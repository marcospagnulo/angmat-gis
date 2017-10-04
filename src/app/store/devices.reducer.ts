import { DevicesActions } from '../actions/devices.actions';
import { Devices } from '../model/device';

const DEFAULTS: Devices = { list: [], active: null };

export function DevicesReducer(state: Devices = DEFAULTS, action: any): any {

  let active, list;

  switch (action.type) {

    case DevicesActions.DEVICES_GET:
      return Object.assign({}, state, { list: action.payload.list });

    case DevicesActions.DEVICES_SET_ACTIVE:
      active = state.list.find(({id}) => id === action.payload.id );
      return Object.assign({}, state, { active });

    case DevicesActions.DEVICES_DELETE:
      list = state.list.filter(({ id }) => id !== action.payload.id);
      return Object.assign({}, state, { list });

    case DevicesActions.DEVICES_RESET:
      return Object.assign({}, state, { active: { os: null } });

    case DevicesActions.DEVICES_ADD:
      list = state.list.concat(action.payload.device);
      return Object.assign({}, state, { list });

    case DevicesActions.DEVICES_UPDATE:
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
