import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/index';
import { CatalogActions } from '../../actions/catalog.actions';

@Component({
  selector: 'catalog',
  template: `
    <div>
      <span class="subhead">Catalogo dei dati</span>
    </div>
    <div>
      <branch *ngFor="let node of (catalog | async).catalogNodes" [node]='node'>

      </branch>
      <!--
      <pre>{{ ((catalog | async)) | json }}</pre>
      -->
    </div>
`
})

export class CatalogComponent implements OnInit {

  @select('catalog') catalog;

  catalogNodes = [];

  constructor( private ngRedux: NgRedux<IAppState>, public actions: CatalogActions ) { }

  ngOnInit() {
    this.actions.loadCatalog();
    this.ngRedux.select(['catalog']).subscribe((catalog: any) => {
      console.log('catalogNodes', catalog.catalogNodes);
    });
  }
}
