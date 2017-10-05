import { Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { User } from '../model/user';

@Component({
  selector: 'home',
  template: `
    <div>Home</div>
    <pre>{{(user | async | json)}}</pre>
    <catalog></catalog>
  `
})

export class HomeComponent {

  @select('user') user;

  u: User;

  constructor( private ngRedux: NgRedux<IAppState>) {

    this.ngRedux.select(['user',])
    .subscribe((u: User) => {
      console.log('user', u);
      this.u = u;
    });
  }
}
