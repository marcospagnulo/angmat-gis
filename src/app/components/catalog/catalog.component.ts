import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.state';

/**
 * Il componente disegna i nodi root di catalogo. I rispettivi figli sono gestiti dal componente branch
 */
@Component({
  selector: 'catalog',
  template: `
  <mat-card id="catalog-container">
    <span class="text title">Catalogo dei dati</span>
    <mat-list malihu-scrollbar [scrollbarOptions]="scrollbarOptions" class="catalog-inner-container">
      <branch mat-list-item *ngFor="let node of app.catalog?.catalogNodes" [node]='node'></branch>
      <div *ngIf="app.catalog.catalogNodes === null" class="mat-spinner-container large-padding">
        <mat-spinner></mat-spinner>
      </div>
    </mat-list>
  </mat-card>
`
})

export class CatalogComponent {

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

  constructor( public app: AppState ) { }
}
