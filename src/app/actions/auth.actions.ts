import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { IAppState } from '../store/index';
import { NgRedux } from '@angular-redux/store';
import { Http } from '@angular/http';
import { Device } from '../model/device';

@Injectable()
export class AuthActions {

  static LOGIN = 'LOGIN';

  returnUrl: string;

  API_URL = 'http://localhost:3000';

  constructor( private ngRedux: NgRedux<IAppState>, private http: Http, private router: Router, private route: ActivatedRoute) {

  }

  /**
   *
   */
  login(username: string, password: string) {
    console.log('AuthActions ' + { username: username, password: password });
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigateByUrl(returnUrl);
    this.ngRedux.dispatch({
      type: AuthActions.LOGIN,
      payload: { username: username, password: password }
    });
  }
}
