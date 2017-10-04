import { Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { AuthActions } from '../actions/auth.actions';

@Component({
  selector: 'login',
  template: `
    <md-card>

      <form #f="ngForm" (ngSubmit)="actions.login(f.value)">

        <!-- Username -->
        <md-form-field class="example-full-width">
          <input mdInput type="text"
            placeholder="Type a name"
            [ngModel]="username"
            name="username"
            #labelRef="ngModel"
            minlength="4"
            required />
          <md-error *ngIf="labelRef.hasError('required')">
            Username is mandatory
          </md-error>
        </md-form-field>

        <div class="small-padding"></div>

        <!-- Device price -->
        <md-form-field class="example-full-width">
          <input mdInput type="number"
            placeholder="Type a password"
            [ngModel]="password"
            name="password"
            #priceRef="ngModel"
            required />
          <md-error *ngIf="priceRef.hasError('required')">
            Password is mandatory
          </md-error>
        </md-form-field>

        <div class="small-padding"></div>

        <button md-raised-button
                color="primary"
                type="submit"
                [disabled]="f.invalid">
          LOGIN
        </button>
      </form>
    </md-card>
  `
})
export class LoginComponent {

  username: string;

  password: string;

  constructor( private ngRedux: NgRedux<IAppState>, public actions: AuthActions ) {

  }
}
