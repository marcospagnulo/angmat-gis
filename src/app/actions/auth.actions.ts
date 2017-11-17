import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { IAppState } from '../store/index';
import { NgRedux } from '@angular-redux/store';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Device } from '../model/device';
import { Config } from '../config';

/**
 * Espone servizi di autenticazione
 */
@Injectable()
export class AuthActions {

  returnUrl: string;

  constructor( private ngRedux: NgRedux<IAppState>, private http: Http, private router: Router, private route: ActivatedRoute) {

  }

  /**
   * Invoca il servizio di autenticazione e reindirizza alla home o alla pagina richiesta prima di autenticarsi
   *
   * @param username
   * @param password
   */
  login(username: string, password: string) {

    const myHeaders = new Headers();
    myHeaders.append('authorization', 'Basic ' + btoa(username + ':' + password));
    myHeaders.append('companyId', Config.COMPANY_ID);
    const options = new RequestOptions({ headers: myHeaders });

    this.http.post(
      `${Config.API_HOST}/${Config.API_SERVICE}/${Config.API_USER_LOGIN}`,
      {},
      options
    ).subscribe(
      (data) => {

        // Recupero il json utente
        const user = data.json();
        user.email = username;
        user.password = password;
        localStorage.setItem('user', JSON.stringify(user));

        // Login event dispatch
        this.ngRedux.dispatch({
          type: 'LOGIN',
          payload: { user: user, loginError: false }
        });
      },
      (err) => {
        this.ngRedux.dispatch({
          type: 'LOGIN',
          payload: { user: null, loginError: true, loginErrorCode: err.status }
        });
      }
    );
  }

  /**
   * Disconnette l'utente corrente
   */
  logout() {
    localStorage.setItem('user', null);
    this.router.navigateByUrl('/login');
    this.ngRedux.dispatch({
      type: 'LOGOUT',
      payload: null
    });
  }
}
