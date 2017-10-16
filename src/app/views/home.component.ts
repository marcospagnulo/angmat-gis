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

  layers: any[] = [];

  constructor(private ngRedux: NgRedux<IAppState>, public catalogActions: CatalogActions,
    public timebarActions: TimebarActions, public util: Util  ) {

    this.ngRedux.select(['auth', 'user']).subscribe((user: User) => {
      this.user = user;
    });

    this.ngRedux.select(['catalog']).subscribe((catalog: Catalog) => {
      this.catalogItems = catalog.catalogItems;
    });

    this.ngRedux.select(['catalog', 'selectedNodes']).subscribe((selectedNodes: any[]) => {
      console.log('selectedNodes', selectedNodes);
      this.selectedNodes = selectedNodes;
      this.timebarActions.loadTimebar(selectedNodes);
      this.clearMap();
    });

    this.ngRedux.select(['timebar']).subscribe((timebar: Timebar) => {
      console.log('timebar', timebar);
      this.timebar = timebar;
    });

    this.ngRedux.select(['timebar', 'selectedTimeslice']).subscribe((selectedTimeslice: number) => {
      console.log('selectedTimeslice', selectedTimeslice);
      if (selectedTimeslice != null) {
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
   *  Rimuovo tutti i layer aggiunti dalla mappa
   */
  clearMap() {
    console.log('clear map');
    for (const layer of this.layers) {
      this.map.removeLayer(layer);
    }
    this.layers = [];
  }

  /**
   * Disegna su mappa gli elementi di catalogo selezionati
   */
  reloadMap() {

    console.log('clear map');

    // Recupero gli item di catalogo dai nodi selezionati
    const items = [];
    if (this.selectedNodes != null) {
      this.selectedNodes.map(node => node.itemIds.map(itemId => this.catalogItems.map(item => {
        if (itemId === item.id) {
          items.push(item);
        }
      })));
    }

    this.clearMap();

    items.map(item => {

      if (item.type === 'FORECAST') {

        // Recupero le date dal time slice per formattare l'url TMS della previsione
        console.log('timebar', this.timebar);
        const timesliceLayer = this.timebar.timeslices[0].layers.find(l => l.layerId === item.id);

        if (timesliceLayer !== undefined) {

          const productiondate = this.util.formatTimesliceDate(timesliceLayer.productionDate);
          const forecastdate = this.util.formatTimesliceDate(this.timebar.selectedTimeslice);
          const forecasttime = this.util.formatTimesliceTime(this.timebar.selectedTimeslice);

          // Formatto la url TMS
          let url = item.inMap.url;
          url = url.replace('{productiondate}', productiondate);
          url = url.replace('{forecastdate}', forecastdate);
          url = url.replace('{forecasttime}', forecasttime);
          const layer = L.tileLayer(url, {tms: true});

          // Aggiungo il layer alla mappa e salvo il riferimento in un array
          this.layers.push(layer);
          this.map.addLayer(layer);
        }
      }
    });
  }
}
