import { Auth } from '../store/auth.reducer';
import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { User } from '../model/user';
import * as L from 'leaflet';

@Component({
  selector: 'home',
  template: `
    <div id="map"></div>
  `
})

export class HomeComponent implements OnInit {

  user: User;

  constructor( private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.select(['auth']).subscribe((auth: Auth) => {
      this.user = auth.user;
    });
  }

  ngOnInit() {

    const map = new L.Map('map', {
      center: new L.LatLng(40.731253, -73.996139),
      zoom: 12,
    });

    const urlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    map.addLayer(L.tileLayer(urlTemplate, { minZoom: 4 }));
  }
}
