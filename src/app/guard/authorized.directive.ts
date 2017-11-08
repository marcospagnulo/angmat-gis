import { User } from '../model/user';
import { IAppState } from '../store';
import { Directive, HostBinding, TemplateRef, ViewContainerRef } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Auth } from '../store/auth.reducer';

@Directive({
  selector: '[authorized]'
})
export class AuthorizedDirective  {

  @select('user') user;

  authenticated: boolean;

  constructor( private ngRedux: NgRedux<IAppState>, private template: TemplateRef<any>, private view: ViewContainerRef) {
    this.ngRedux.select(['auth']).subscribe((auth: Auth) => {
      if (auth.user != null) {
        this.view.createEmbeddedView(this.template);
      } else {
        this.view.detach();
      }
    });
  }
}
