import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.state';

/**
 * Il componente disegna i nodi root di catalogo. I rispettivi figli sono gestiti dal componente branch
 */
@Component({
  selector: 'catalog',
  template: `
  <mat-card id="catalog-container" class="top right"
    [ngClass]="{'minimized': state === 'minimized','maximized': state === 'maximized'}">
    <div class="card-toggle right">
      <button class="minimize-button" mat-icon-button (click)="toggleSize()">
        <span class="fa text fa-minus"></span>
      </button>
      <button class="maximize-button" mat-icon-button (click)="toggleSize()">
        <mat-icon>folder</mat-icon>
      </button>
    </div>
    <div class="inner-container">
      <span class="text title">Catalogo dei dati</span>
      <mat-list malihu-scrollbar [scrollbarOptions]="scrollbarOptions" class="catalog-inner-container">
        <branch mat-list-item *ngFor="let node of app.catalog?.catalogNodes" [node]='node'></branch>
        <div *ngIf="app.catalog.catalogNodes === null" class="mat-spinner-container large-padding">
          <mat-spinner></mat-spinner>
        </div>
      </mat-list>
    </div>
  </mat-card>
`
})

export class CatalogComponent {

  state = 'maximized';

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

  constructor( public app: AppState ) { }

  /**
   * Effettua il toggle sullo stato minimizzato/massimizzato  della card
   */
  toggleSize() {
    this.state = this.state === 'minimized' ? 'maximized' : 'minimized';
  }
}
