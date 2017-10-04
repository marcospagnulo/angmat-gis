import { Component } from '@angular/core';
import { select } from '@angular-redux/store';

@Component({
  selector: 'navbar',
  template: `
    <div  id="navbar-content">
    </div>
`
})

export class NavBarComponent {

  @select('theme_color') themeColor;

}
