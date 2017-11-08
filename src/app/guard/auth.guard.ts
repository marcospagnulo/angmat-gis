import { Auth } from '../store/auth.reducer';
import { User } from '../model/user';
import { IAppState } from '../store';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  @select('user') user;

  authenticated: boolean;

  constructor(private ngRedux: NgRedux<IAppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.ngRedux.select(['auth']).map((auth: Auth) => {
      if (auth.user == null) {
        console.log('no user logged, redirect to login');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      }
      return auth.user != null;
    });
  }
}
