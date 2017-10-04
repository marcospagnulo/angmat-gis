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
    <!-- Toolbar -->
    <md-toolbar color="primary" class="large-padding" *authorized>
      <button md-icon-button (click)="sidenav.toggle()">
        <md-icon>menu</md-icon>
      </button>
      <h2>Demo Application</h2>
    </md-toolbar>

    <md-sidenav-container>

      <!-- Sidenav -->
      <md-sidenav #sidenav mode="side" opened="true" *authorized>
        <md-list class="small-padding">
          <button md-button (click)="goToPage('/home')" md-list-item>
            <md-icon md-list-icon>home</md-icon>
            <span class="text subhead" md-line>Home</span>
          </button>
          <button md-button (click)="goToPage('/redux')" md-list-item>
            <md-icon md-list-icon>build</md-icon>
            <span class="text subhead" md-line>Redux</span>
          </button>
          <md-divider></md-divider>
          <button md-button (click)='logout()' md-list-item>
            <md-icon md-list-icon>input</md-icon>
            <span class="text subhead" md-line>Logout</span>
          </button>
        </md-list>
      </md-sidenav>

      <!-- Main content-->
      <div class="app-content large-padding">
        <router-outlet></router-outlet>
    </div>
  </md-sidenav-container>
  `
})

export class AppComponent {

  @ViewChild('sidenav') sidenav;

  @select('config') config;   // use angular-redux select decorator

  constructor( private ngRedux: NgRedux<IAppState>, public actions: AuthActions, private router: Router, private route: ActivatedRoute ) {

  }

  goToPage(page) {
    this.router.navigateByUrl(page);
  }

  logout() {
    this.actions.logout();
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }

  changeColor(color: string) {
    this.ngRedux.dispatch({
      type: 'SET_THEME_COLOR',
      payload: { color }
    });
  }

}
