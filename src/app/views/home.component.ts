import { Auth } from '../store/auth.reducer';
import { Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { User } from '../model/user';

@Component({
  selector: 'home',
  template: `
    <div>Home</div>
    <pre>{{user | json}}</pre>
    <catalog></catalog>
  `
})

export class HomeComponent {

  user: User;

  constructor( private ngRedux: NgRedux<IAppState>) {

    this.ngRedux.select(['auth']).subscribe((auth: Auth) => {
      console.log('user', auth.user);
      this.user = auth.user;
    });
  }
}
