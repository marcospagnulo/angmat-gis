import { Timebar } from '../store/timebar.reducer';
import { Auth } from '../store/auth.reducer';
import { Catalog } from '../store/catalog.reducer';
import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { User } from '../model/user';
import { CatalogActions } from '../actions/catalog.actions';
import { TimebarActions } from '../actions/timebar.actions';
import * as L from 'leaflet';

@Component({
  selector: 'home',
  template: `
  <mat-card id="catalog-container">
    <catalog></catalog>
  </mat-card>
  <div id="map"></div>
  <timebar></timebar>
  `
})

export class HomeComponent implements OnInit {

  user: User;

  map: L.Map;

  constructor(private ngRedux: NgRedux<IAppState>, public catalogActions: CatalogActions, public timebarActions: TimebarActions  ) {

    this.ngRedux.select(['auth', 'user']).subscribe((user: User) => {
      this.user = user;
    });

    this.ngRedux.select(['catalog', 'selectedNodes']).subscribe((selectedNodes: any[]) => {
      console.log('selectedNodes', selectedNodes);
      this.timebarActions.loadTimebar(selectedNodes);
    });

    this.ngRedux.select(['timebar', 'timeslices']).subscribe((timeslices: number[]) => {
      console.log('timeslices', timeslices);
    });
  }

  ngOnInit() {

    // Init map
    this.map = new L.Map('map', {
      zoomControl: false,
      center: new L.LatLng(40, 18),
      zoom: 8,
    });

    // Map base layer
    const urlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    this.map.addLayer(L.tileLayer(urlTemplate, { minZoom: 4 }));
  }

  /**
   * Disegna su mappa gli elementi di catalogo selezionati
   */
  drawSelectedLayer(catalog) {

    // Recupero gli item di catalogo dai nodi selezionati
    const items = [];
    catalog.selectedNodes.map(node => {
      const itemIds = node.itemIds;
      for (const itemId of itemIds) {
        for (const item of catalog.catalogItems) {
          if (itemId === item.id) {
            items.push(item);
          }
        }
      }
    });
  }
}
