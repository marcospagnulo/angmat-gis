import { Component, Inject, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { AuthActions } from '../actions/auth.actions';
import { MdSnackBar } from '@angular/material';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'login',
  template: `
    <md-grid-list cols="3" rowHeight="1:1">

      <md-grid-tile></md-grid-tile>

      <md-grid-tile>

        <md-card>

          <form #f="ngForm" (ngSubmit)="login(f.value)">

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
              <input mdInput type="password"
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

      </md-grid-tile>

      <md-grid-tile></md-grid-tile>

    </md-grid-list>

  `
})

export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor( private ngRedux: NgRedux<IAppState>, public actions: AuthActions, public dialog: MdDialog, public snackBar: MdSnackBar ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
  }
  login (data) {
    this.actions.login(data.username, data.password);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 15000,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.username, animal: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <div>Alert</div>
  `,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MdDialogRef<DialogOverviewExampleDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
  <div>Snackbar</div>
  `
})
export class SnackbarComponent {}
