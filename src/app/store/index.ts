import { combineReducers } from 'redux';
import { ConfigReducer, Config } from './config.reducer';
import { DevicesReducer } from './devices.reducer';
import { Device } from '../model/device';

export class IAppState {
  config?: Config;
  devices?: Device;
}

export const rootReducer = combineReducers<IAppState>({
  config: ConfigReducer,
  devices: DevicesReducer
});
