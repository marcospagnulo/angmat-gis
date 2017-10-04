import { User } from '../model/user';
import { IAppState } from '../store';
import { Directive, HostBinding, TemplateRef, ViewContainerRef } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
@Directive({
  selector: '[authorized]'
})
export class AuthorizedDirective  {

  @select('user') user;

  authenticated: boolean;

  constructor( private ngRedux: NgRedux<IAppState>, private template: TemplateRef<any>, private view: ViewContainerRef) {
    this.ngRedux.select(['user'])
    .subscribe((user: User) => {
      console.log(user);
      if (user != null) {
        this.view.createEmbeddedView(this.template);
      } else {
        this.view.detach();
      }
    });
  }
}
