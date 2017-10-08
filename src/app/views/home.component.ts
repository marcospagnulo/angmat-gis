import { Auth } from '../store/auth.reducer';
import { Catalog } from '../store/catalog.reducer';
import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { User } from '../model/user';
import { CatalogActions } from '../actions/catalog.actions';
import * as L from 'leaflet';

@Component({
  selector: 'home',
  template: `
    <mat-card id="catalog-container">
      <catalog></catalog>
    </mat-card>
    <div id="map"></div>
  `
})

export class HomeComponent implements OnInit {

  user: User;

  map: L.Map;

  constructor(private ngRedux: NgRedux<IAppState>, public actions: CatalogActions ) {

    this.ngRedux.select(['auth']).subscribe((auth: Auth) => {
      this.user = auth.user;
    });

    this.ngRedux.select(['catalog']).subscribe((catalog: Catalog) => {
      this.drawSelectedLayer(catalog);
    });
  }

  ngOnInit() {

    // Init map
    this.map = new L.Map('map', {
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

    // Scarico la barra del tempo
    if (catalog.selectedNodes.length > 0) {
      this.actions.loadTimebar(catalog.selectedNodes.map((n) => n.id));
    }
  }
}
