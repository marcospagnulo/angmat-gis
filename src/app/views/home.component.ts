import { Timebar } from '../store/timebar.reducer';
import { Auth } from '../store/auth.reducer';
import { Catalog } from '../store/catalog.reducer';
import { Component, Input, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { CatalogActions } from '../actions/catalog.actions';
import { TimebarActions } from '../actions/timebar.actions';
import { Util } from '../common/util';
import { AppState } from '../app.state';
import * as L from 'leaflet';

@Component({
  selector: 'home',
  template: `
  <catalog></catalog>
  <div id="map"></div>
  <timebar></timebar>
  <map-layers></map-layers>
  `
})

export class HomeComponent implements OnInit {

  map: L.Map;

  layers: any[] = [];

  loadTimebarPID: any = null;

  constructor(private ngRedux: NgRedux<IAppState>, public catalogActions: CatalogActions,
    public timebarActions: TimebarActions, public util: Util, public app: AppState) {

    // la selezione di nodi di catalogo prevede il ricaricamento della timebar
    app.onSelectNodes.subscribe((selectedNodes: any[]) => {
      clearTimeout(this.loadTimebarPID);
      this.loadTimebarPID = setTimeout(() => this.timebarActions.loadTimebar(selectedNodes), 1000);
    });

    app.onTimebarLoad.subscribe((timebar: any) => {
      if (timebar.selectedTimeslice) {
        this.reloadMap();
      } else {
        this.clearMap();
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
    this.reloadMap();

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

    this.clearMap();

    console.log('reload map');

    // Recupero gli item di catalogo dai nodi selezionati
    const items = [];
    if (this.app.selectedNodes != null) {
      this.app.selectedNodes.map(node => node.itemIds.map(itemId => this.app.catalog.catalogItems.map(item => {
        if (itemId === item.id) {
          items.push(item);
        }
      })));
    }
    if (this.app.timebar.timeslices) {

      items.map(item => {

        if (item.type === 'FORECAST') {

          // Recupero le date dal time slice per formattare l'url TMS della previsione
          const timesliceLayer = this.app.timebar.timeslices[0].layers.find(l => l.layerId === item.id);

          if (timesliceLayer !== undefined) {

            const productiondate = this.util.formatTimesliceDate(timesliceLayer.productionDate);
            const forecastdate = this.util.formatTimesliceDate(this.app.timebar.selectedTimeslice);
            const forecasttime = this.util.formatTimesliceTime(this.app.timebar.selectedTimeslice);

            // Formatto la url TMS
            let url = item.inMap.url;
            url = url.replace('{productiondate}', productiondate);
            url = url.replace('{forecastdate}', forecastdate);
            url = url.replace('{forecasttime}', forecasttime);
            const layer = L.tileLayer(url, { tms: true });

            // Aggiungo il layer alla mappa e salvo il riferimento in un array
            this.layers.push(layer);
            setTimeout(() => {
              this.map.addLayer(layer);
            }, 50);
          }
        }
      });
    }
  }
}
