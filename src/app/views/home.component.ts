import { Timebar } from '../store/timebar.reducer';
import { Auth } from '../store/auth.reducer';
import { Catalog } from '../store/catalog.reducer';
import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { User } from '../model/user';
import { CatalogActions } from '../actions/catalog.actions';
import { TimebarActions } from '../actions/timebar.actions';
import { Util } from '../common/util';
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

  catalogItems: any[];

  selectedNodes: any[];

  timebar: Timebar;

  constructor(private ngRedux: NgRedux<IAppState>, public catalogActions: CatalogActions,
    public timebarActions: TimebarActions, public util: Util  ) {

    this.ngRedux.select(['auth', 'user']).subscribe((user: User) => {
      this.user = user;
    });

    this.ngRedux.select(['catalog']).subscribe((catalog: Catalog) => {
      this.catalogItems = catalog.catalogItems;
    });

    this.ngRedux.select(['catalog', 'selectedNodes']).subscribe((selectedNodes: any[]) => {
      this.selectedNodes = selectedNodes;
      this.timebarActions.loadTimebar(selectedNodes);
    });

    this.ngRedux.select(['timebar']).subscribe((timebar: Timebar) => {
      this.timebar = timebar;
    });

    this.ngRedux.select(['timebar', 'selectedTimeslice']).subscribe((selectedTimeslice: number) => {
      console.log('selectedTimeslice', selectedTimeslice);
      if (this.timebar != null && selectedTimeslice != null) {
        this.reloadMap();
      }
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
  reloadMap() {

    // Recupero gli item di catalogo dai nodi selezionati
    const items = [];
    this.selectedNodes.map(node => node.itemIds.map(itemId => this.catalogItems.map(item => {
      if (itemId === item.id) {
        items.push(item);
      }
    })));

    console.log('items', items);
    items.map(item => {

      if (item.type === 'FORECAST') {

        const layer = this.timebar.timeslices[0].layers.find(l => l.layerId === item.id);
        const productiondate = this.util.formatTimesliceDate(layer.productionDate);
        const forecastdate = this.util.formatTimesliceDate(this.timebar.selectedTimeslice);
        const forecasttime = this.util.formatTimesliceTime(this.timebar.selectedTimeslice);

        let url = item.inMap.url;
        url = url.replace('{productiondate}', productiondate);
        url = url.replace('{forecastdate}', forecastdate);
        url = url.replace('{forecasttime}', forecasttime);
        this.map.addLayer( L.tileLayer(url, {tms: true}) );
      }
    });
  }
}
