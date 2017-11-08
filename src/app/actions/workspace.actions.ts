import { Injectable } from '@angular/core';
import { IAppState } from '../store/index';
import { NgRedux } from '@angular-redux/store';
import { Http } from '@angular/http';
import { Device } from '../model/device';

@Injectable()
export class WorkspaceActions {

  static DEVICES_GET = 'DEVICES_GET';

  static DEVICES_SET_ACTIVE = 'DEVICES_SET_ACTIVE';

  static DEVICES_DELETE = 'DEVICES_DELETE';

  static DEVICES_RESET = 'DEVICES_RESET';

  static DEVICES_UPDATE = 'DEVICES_UPDATE';

  static DEVICES_ADD = 'DEVICES_ADD';

  API_URL = 'http://localhost:3000';

  constructor( private ngRedux: NgRedux<IAppState>, private http: Http ) {

  }

  /**
   *
   */
  getAll() {
    this.http.get(`${this.API_URL}/devices`)
      .subscribe((res) => {
        const list = res.json();
        this.ngRedux.dispatch({
          type: WorkspaceActions.DEVICES_GET,
          payload: { list }
        });
      });
  }

  /**
   *
   * @param device
   * @param id
   */
  save(device: Device, id?: number) {
    if (id) {
      this.update(device, id);
    } else {
      this.add(device);
    }
  }

  /**
   *
   * @param id
   */
  delete(id) {
    this.http.delete(`${this.API_URL}/devices/${id}`)
      .subscribe((res) => {
        this.ngRedux.dispatch({
          type: WorkspaceActions.DEVICES_DELETE,
          payload: { id }
        });
        this.reset();
      });
  }

  update(device: Device, id: number) {
    this.http.patch(`${this.API_URL}/devices/${id}`, device)
      .subscribe((res) => {
        this.ngRedux.dispatch({
          type: WorkspaceActions.DEVICES_UPDATE,
          payload: { device: res.json() }
        });
      });
  }

  add(device: Device): void {
    this.http.post(`${this.API_URL}/devices/`, device)
      .subscribe((res) => {
        this.ngRedux.dispatch({
          type: WorkspaceActions.DEVICES_ADD,
          payload: { device: res.json() }
        });
        this.setActive(res.json().id);  // select last added device
      });
  }

  /**
   *
   */
  reset() {
    this.ngRedux.dispatch({
      type: WorkspaceActions.DEVICES_RESET,
      payload: null
    });
  }

  /**
   * Setta un elemento della lista come attivo
   *
   * @param id - identificativo elemento della lista
   */
  setActive(id: number): void {
    this.ngRedux.dispatch({
      type: WorkspaceActions.DEVICES_SET_ACTIVE,
      payload: { id }
    });
  }
}
