import { Auth } from '../store/auth.reducer';
import { Catalog } from '../store/catalog.reducer';
import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { User } from '../model/user';
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

  constructor( private ngRedux: NgRedux<IAppState>) {

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

    console.log('drawSelectedLayer - catalog state', catalog);
    catalog.selectedNodes.map(node => {

      const itemIds = node.itemIds;
      const items = catalog.catalogItems.filter(({ id }) => id === itemIds[0]);
      console.log('drawSelectedLayer - items', items);
    });
  }
}
