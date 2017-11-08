import { Timebar, TimebarReducer } from './timebar.reducer';
import { combineReducers } from 'redux';
import { ConfigReducer, Config } from './config.reducer';
import { CatalogReducer, Catalog } from './catalog.reducer';
import { WorkspaceReducer } from './workspace.reducer';
import { AuthReducer, Auth } from './auth.reducer';
import { Device } from '../model/device';

export class IAppState {
  config?: Config;
  devices?: Device;
  auth?: Auth;
  catalog?: Catalog;
  timebar?: Timebar;
}

export const rootReducer = combineReducers<IAppState>({
  config: ConfigReducer,
  workspace: WorkspaceReducer,
  auth: AuthReducer,
  catalog: CatalogReducer,
  timebar: TimebarReducer
});
