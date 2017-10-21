import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.state';

@Component({
  selector: 'catalog',
  template: `
  <mat-card id="catalog-container">
    <span class="text title">Catalogo dei dati</span>
    <mat-list class="catalog-inner-container">
      <branch mat-list-item *ngFor="let node of app.catalog?.catalogNodes" [node]='node'></branch>
      <div *ngIf="app.catalog.catalogNodes === null" class="mat-spinner-container large-padding">
        <mat-spinner></mat-spinner>
      </div>
    </mat-list>
  </mat-card>
`
})

export class CatalogComponent {
  constructor( public app: AppState ) { }
}
