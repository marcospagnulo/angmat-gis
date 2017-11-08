import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { Device } from '../model/device';
import { WorkspaceActions } from '../actions/workspace.actions';

@Component({
  selector: 'workspace',
  template: `
  <div class="large-padding">

    <mat-card>

      <form #f="ngForm" (ngSubmit)="actions.save(f.value, device.id)">

        <!-- Device name -->
        <mat-form-field class="example-full-width">
          <input matInput type="text"
            placeholder="Type a name"
            [ngModel]="device?.label"
            name="label"
            #labelRef="ngModel"
            minlength="4"
            required />
          <mat-error *ngIf="labelRef.errors && labelRef.dirty">
            Device name is incorrect
          </mat-error>
          <mat-error *ngIf="labelRef.hasError('required')">
            Device name is mandatory
          </mat-error>
        </mat-form-field>

        <div class="small-padding"></div>

        <!-- Device price -->
        <mat-form-field class="example-full-width">
          <input matInput type="number"
            placeholder="Type a price"
            [ngModel]="device?.price"
            name="price"
            #priceRef="ngModel"
            required />
          <mat-error *ngIf="priceRef.hasError('required')">
            Price is mandatory
          </mat-error>
        </mat-form-field>

        <div class="small-padding"></div>

        <button mat-raised-button
                color="primary"
                type="submit"
                [disabled]="f.invalid">
          {{device?.id ? 'SAVE' : 'ADD'}}
        </button>
        <button mat-raised-button
                type="button"
                (click)="actions.reset()">
          RESET
        </button>
      </form>
    </mat-card>

    <div class="small-padding"></div>

    <mat-card>
      <mat-list>
        <h3 mat-subheader>Devices</h3>
        <mat-list-item [ngClass]="{'active': device?.id === d.id}"
          *ngFor="let d of devices | async">
            <div class="pull-left">
              <span class="text subhead">{{d.label}}</span><br/>
              <span class="text body">{{d.price}}$</span>
            </div>
            <div class="pull-right">
              <button mat-icon-button>
                <mat-icon (click)="actions.setActive(d.id)">edit</mat-icon>
              </button>
              <button mat-icon-button>
                <mat-icon (click)="actions.delete(d.id)">delete</mat-icon>
              </button>
            </div>
            <div style="clear: right"></div>
        </mat-list-item>
      </mat-list>
    </mat-card>
  </div>
  `
})

export class WorkspaceComponent {

    @select('config') config;   // use angular-redux select decorator

    @select(['devices', 'list']) devices;

    device: Device;

    constructor( private ngRedux: NgRedux<IAppState>, public actions: WorkspaceActions ) {

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
