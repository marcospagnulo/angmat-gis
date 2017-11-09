import { NgClass } from '@angular/common/src/directives/ng_class';
import { AppState } from './app.state';
import { AuthActions } from './actions/auth.actions';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'hammerjs';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from './store/index';

@Component({
  selector: 'app-root',
  template:
  `
  <mat-sidenav-container>

    <!-- Toolbar -->
    <mat-toolbar color="primary" class="mat-elevation-z6 large-padding" *authorized
      [ngClass]="{'floating': (router.url === '/home' || router.url === '/')}" >
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <h2>AngMat Gis</h2>
    </mat-toolbar>

    <!-- Sidenav -->
    <mat-sidenav class="mat-elevation-z20" #sidenav mode="over" opened="false" *authorized>
      <div class="sidenav-header">
        <span class="text title white bold">AngMat Gis</span>
        <div class="user-info">
          <span class="text subhead bold white">{{app.user.fullName}}</span>
          <span class="text body white">{{app.user.email}}</span>
        </div>
      </div>
      <mat-list class="small-padding">
        <button mat-button (click)="goToPage('/home')" mat-list-item
        [ngClass]="{'active': (router.url === '/home' || router.url === '/')}">
          <mat-icon mat-list-icon>home</mat-icon>
          <span class="text subhead" mat-line>Home</span>
        </button>
        <button mat-button (click)="goToPage('/workspace')" mat-list-item
        [ngClass]="{'active': (router.url === '/workspace')}">
          <mat-icon mat-list-icon>map</mat-icon>
          <span class="text subhead" mat-line>Workspace</span>
        </button>
        <mat-divider></mat-divider>
        <button mat-button (click)='logout()' mat-list-item>
          <mat-icon mat-list-icon>input</mat-icon>
          <span class="text subhead" mat-line>Logout</span>
        </button>
      </mat-list>
    </mat-sidenav>

    <!-- Main content-->
    <div class="app-content" [ngClass]="{'below-toolbar': (router.url !== '/home' && router.url !== '/' && router.url !== '/login')}">
      <router-outlet></router-outlet>
    </div>

    <!-- Snackbar -->
    <div class="mat-snackbar-container">
      <div class="mat-snackbar" [ngClass]="{'up': snackBarVisible, 'down': !snackBarVisible}">
        <span class="text subhead">{{snackBarText}}</span>
      </div>
    </div>
  </mat-sidenav-container>
  `
})

export class AppComponent {

  @ViewChild('sidenav') sidenav;

  snackBarVisible: boolean;

  snackBarText: string;

  constructor(private ngRedux: NgRedux<IAppState>, public actions: AuthActions, public router: Router, public route: ActivatedRoute,
    public app: AppState) {

      this.snackBarVisible = false;

      app.onOpenSnackBar.subscribe(text => {
        this.snackBarVisible = true;
        this.snackBarText = text;
        setTimeout(() => {
          this.snackBarVisible = false;
          this.snackBarText = '';
        }, 3000);
      });
  }

  /**
   * Visualizza una snackbar
   *
   * @param text
   */
  openSnackBar(text) {
    this.snackBarText = text;
  }

  /**
   * Funzione esegue il routing verso la pagina in ingresso
   *
   * @param page
   */
  goToPage(page) {
    console.log(this.router.url);
    this.router.navigateByUrl(page);
    this.sidenav.toggle();
  }

  /**
   *
   */
  logout() {
    this.sidenav.toggle();
    setTimeout(() => this.actions.logout(), 200);
  }

  /**
   * Apre/chiude la sidenva
   */
  toggleSideNav() {
    this.sidenav.toggle();
  }

}
