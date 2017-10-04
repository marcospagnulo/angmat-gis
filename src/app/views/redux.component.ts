import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { Device } from '../model/device';
import { DevicesActions } from '../actions/devices.actions';

@Component({
  selector: 'redux',
  template: `


  <md-card>
    <h3>{{(config | async).color}}</h3>
    <button md-raised-button (click)="changeColor('green')">Change Color</button>
  </md-card>

  <div class="small-padding"></div>

  <md-card>

    <form #f="ngForm" (ngSubmit)="actions.save(f.value, device.id)">

      <!-- Device name -->
      <md-form-field class="example-full-width">
        <input mdInput type="text"
          placeholder="Type a name"
          [ngModel]="device?.label"
          name="label"
          #labelRef="ngModel"
          minlength="4"
          required />
        <md-error *ngIf="labelRef.errors && labelRef.dirty">
          Device name is incorrect
        </md-error>
        <md-error *ngIf="labelRef.hasError('required')">
          Device name is mandatory
        </md-error>
      </md-form-field>

      <div class="small-padding"></div>

      <!-- Device price -->
      <md-form-field class="example-full-width">
        <input mdInput type="number"
          placeholder="Type a price"
          [ngModel]="device?.price"
          name="price"
          #priceRef="ngModel"
          required />
        <md-error *ngIf="priceRef.hasError('required')">
          Price is mandatory
        </md-error>
      </md-form-field>

      <div class="small-padding"></div>

      <button md-raised-button
              color="primary"
              type="submit"
              [disabled]="f.invalid">
        {{device?.id ? 'SAVE' : 'ADD'}}
      </button>
      <button md-raised-button
              type="button"
              (click)="actions.reset()">
        RESET
      </button>
    </form>
  </md-card>

  <div class="small-padding"></div>

  <md-card>
    <md-list>
      <h3 md-subheader>Devices</h3>
      <md-list-item [ngClass]="{'active': device?.id === d.id}"
        *ngFor="let d of devices | async">
          <div class="pull-left">
            <span class="text subhead">{{d.label}}</span><br/>
            <span class="text body">{{d.price}}$</span>
          </div>
          <div class="pull-right">
            <button md-icon-button>
              <md-icon (click)="actions.setActive(d.id)">edit</md-icon>
            </button>
            <button md-icon-button>
              <md-icon (click)="actions.delete(d.id)">delete</md-icon>
            </button>
          </div>
          <div style="clear: right"></div>
      </md-list-item>
    </md-list>
  </md-card>
  `
})

export class ReduxComponent {

    @select('config') config;   // use angular-redux select decorator

    @select(['devices', 'list']) devices;

    device: Device;

    constructor( private ngRedux: NgRedux<IAppState>, public actions: DevicesActions ) {

      actions.reset();
      actions.getAll();

      this.ngRedux.select(['devices', 'active'])
      .subscribe((device: Device) => {
        this.device = device;
      });
    }

    changeColor(color: string) {
      this.ngRedux.dispatch({
        type: 'SET_THEME_COLOR',
        payload: { color }
      });
    }
}
