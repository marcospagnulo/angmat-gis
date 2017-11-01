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
      <mat-toolbar color="primary" class="mat-elevation-z6 large-padding" *authorized>
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <h2>Demo Application</h2>
      </mat-toolbar>

      <!-- Sidenav -->
      <mat-sidenav class="mat-elevation-z20" #sidenav mode="over" opened="false" *authorized>
        <mat-list class="small-padding">
          <button mat-button (click)="goToPage('/home')" mat-list-item>
            <mat-icon mat-list-icon>home</mat-icon>
            <span class="text subhead" mat-line>Home</span>
          </button>
          <button mat-button (click)="goToPage('/redux')" mat-list-item>
            <mat-icon mat-list-icon>build</mat-icon>
            <span class="text subhead" mat-line>Redux</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-button (click)='logout()' mat-list-item>
            <mat-icon mat-list-icon>input</mat-icon>
            <span class="text subhead" mat-line>Logout</span>
          </button>
        </mat-list>
      </mat-sidenav>

      <!-- Main content-->
      <div class="app-content">
        <router-outlet></router-outlet>
    </div>
  </mat-sidenav-container>
  `
})

export class AppComponent {

  @ViewChild('sidenav') sidenav;

  constructor( private ngRedux: NgRedux<IAppState>, public actions: AuthActions, private router: Router, private route: ActivatedRoute ) {

  }

  /**
   * Funzione esegue il routing verso la pagina in ingresso
   *
   * @param page
   */
  goToPage(page) {
    this.router.navigateByUrl(page);
    this.sidenav.toggle();
  }

  /**
   *
   */
  logout() {
    this.sidenav.toggle();
    setTimeout( () => this.actions.logout(), 200);
  }

  /**
   * Apre/chiude la sidenva
   */
  toggleSideNav() {
    this.sidenav.toggle();
  }

}
