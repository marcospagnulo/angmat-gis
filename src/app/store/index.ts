import { combineReducers } from 'redux';
import { ConfigReducer, Config } from './config.reducer';
import { CatalogReducer } from './catalog.reducer';
import { DevicesReducer } from './devices.reducer';
import { AuthReducer, Auth } from './auth.reducer';
import { Device } from '../model/device';

export class IAppState {
  config?: Config;
  devices?: Device;
  auth?: Auth;
  catalog?: any;
}

export const rootReducer = combineReducers<IAppState>({
  config: ConfigReducer,
  devices: DevicesReducer,
  auth: AuthReducer,
  catalog: CatalogReducer
});
