import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { CatalogActions } from '../actions/catalog.actions';

@Component({
  selector: 'catalog',
  template: `
    <div>
      Catalogo
    </div>
    <pre>{{(catalog | async | json)}}</pre>
`
})

export class CatalogComponent implements OnInit {

  @select('catalog') catalog;

  constructor( private ngRedux: NgRedux<IAppState>, public actions: CatalogActions ) { }

  ngOnInit() {
    this.actions.loadCatalog();
  }
}
