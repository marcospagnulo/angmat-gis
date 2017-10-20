import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/index';
import { CatalogActions } from '../../actions/catalog.actions';

@Component({
  selector: 'catalog',
  template: `
  <mat-card id="catalog-container">
    <span class="text title">Catalogo dei dati</span>
    <mat-list>
      <branch mat-list-item *ngFor="let node of (catalog | async).catalogNodes" [node]='node'></branch>
      <div *ngIf="(catalog | async).catalogNodes === null" class="mat-spinner-container large-padding">
        <mat-spinner></mat-spinner>
      </div>
    </mat-list>
  </mat-card>
`
})

export class CatalogComponent implements OnInit {

  @select('catalog') catalog;

  constructor( private ngRedux: NgRedux<IAppState>, public actions: CatalogActions ) { }

  ngOnInit() {
    this.actions.loadCatalog();
  }
}
