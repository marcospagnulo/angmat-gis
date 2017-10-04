import { Component } from '@angular/core';
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
        <md-list>
          <a routerLink="/home" routerLinkActive="bg" md-list-item>
            <md-icon md-list-icon>home</md-icon>
            <h4 md-line>Home</h4>
          </a>
          <a routerLink="/redux" routerLinkActive="bg" md-list-item>
            <md-icon md-list-icon>build</md-icon>
            <h4 md-line>Redux</h4>
          </a>
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

  @select('config') config;   // use angular-redux select decorator

  constructor( private ngRedux: NgRedux<IAppState> ) {

  }

  logout(){
    this.ngRedux.dispatch({
      type: 'LOGOUT',
      payload: { }
    });
  }

  changeColor(color: string) {
    this.ngRedux.dispatch({
      type: 'SET_THEME_COLOR',
      payload: { color }
    });
  }

}
