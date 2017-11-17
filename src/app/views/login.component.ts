import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../store/auth.reducer';
import { Component, Inject, OnInit } from '@angular/core';
import { IAppState } from '../store/index';
import { AuthActions } from '../actions/auth.actions';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'login',
  template: `

  <mat-card [ngClass]="{'fade-show' : toggleLogin, 'fade-hide': !toggleLogin, 'explode': explode}">

    <div class="login-header">
      <span class="text title white bold">AngMat Gis</span>
    </div>

    <div class="large-padding">
      <form #f="ngForm" (ngSubmit)="login(f.value)">

        <!-- Username field -->
        <mat-form-field class="example-full-width">
          <input matInput type="text"
            placeholder="Type a name"
            [ngModel]="username"
            name="username"
            #labelRef="ngModel"
            minlength="4"
            required />
          <mat-error *ngIf="labelRef.hasError('required')">
            Username is mandatory
          </mat-error>
        </mat-form-field>

        <div class="small-padding"></div>

        <!-- Password field -->
        <mat-form-field class="example-full-width">
          <input matInput type="password"
            placeholder="Type a password"
            [ngModel]="password"
            name="password"
            #priceRef="ngModel"
            required />
          <mat-error *ngIf="priceRef.hasError('required')">
            Password is mandatory
          </mat-error>
        </mat-form-field>

        <div class="small-padding"></div>

        <!-- Login button -->
        <button mat-raised-button
                color="primary"
                type="submit"
                [disabled]="f.invalid || loginInProgress">
          <span *ngIf="!loginInProgress">LOGIN</span>
          <mat-spinner *ngIf="loginInProgress" color="warn"></mat-spinner>
        </button>
      </form>
    </div>
  </mat-card>

  `
})

export class LoginComponent implements OnInit {

  toggleLogin: boolean;

  explode: boolean;

  username: string;

  password: string;

  loginInProgress: boolean;

  constructor(public actions: AuthActions, public dialog: MatDialog, public snackBar: MatSnackBar, public app: AppState,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.explode = false;
    this.toggleLogin = false;

    this.app.onAuthChange.subscribe(auth => {
      this.loginInProgress = false;

      if (auth.loginError && auth.loginErrorCode === 403) {
        this.openSnackBar('Credenziali errate');
      } else if (auth.loginError) {
        this.openSnackBar('Si è verificato un errore');
      }

      // Parte una animazione "esplosiva" sulla card di login
      this.explode = true;
      setTimeout(() => {
        // reindirizzo alla pagina richiesta in stato di non autenticazione
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      }, 500);
    });

    setTimeout(() => {
      this.toggleLogin = true;
    }, 1500);
  }

  login(data) {
    this.loginInProgress = true;
    this.actions.login(data.username, data.password);
  }

  openSnackBar(text) {
    this.app.onOpenSnackBar.emit(text);
  }
}
