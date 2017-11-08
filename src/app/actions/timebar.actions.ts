import { Injectable } from '@angular/core';
import { IAppState } from '../store/index';
import { NgRedux } from '@angular-redux/store';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Device } from '../model/device';
import { Config } from '../config';

/**
 * Classe action per funzionalità della barra del tempo
 */
@Injectable()
export class TimebarActions {

  constructor( private ngRedux: NgRedux<IAppState>, private http: Http) { }

  /**
   * Imposta l'orario selezionato
   *
   * @param t - orario selezionato
   */
  selectTimeslice(t) {
    this.ngRedux.dispatch({
      type: 'SELECT_TIMESLICE',
      payload: t
    });
  }

  /**
   * Scarica la barra del tempo in base ai nodi di catalogo selezionati
   *
   * @param nodes - nodi di catalogo selezionati
   */
  loadTimebar(nodes, selectedTimeslice) {

    if (nodes && nodes.length > 0) {

      // Evento di caricamento in corso
      this.ngRedux.dispatch({
        type: 'LOADING_TIMEBAR',
        payload: true
      });

      const user = JSON.parse(localStorage.getItem('user'));
      const myHeaders = new Headers();
      myHeaders.append('userId', user.id);
      myHeaders.append('companyId', Config.COMPANY_ID);
      myHeaders.append('password', user.password);
      const options = new RequestOptions({ headers: myHeaders });

      let url = `${Config.API_HOST}/${Config.API_SERVICE}/${Config.API_CATALOG_TIMESLICES}`;
      url = url + nodes.map(item => item.id).join(',');
      this.http.get(url, options).subscribe(
        (response) => {
          const timebar = { timeslices: response.json().data, selectedTimeslice: selectedTimeslice, timebarLoading: false };
          this.ngRedux.dispatch({
            type: 'LOAD_TIMEBAR',
            payload: timebar
          });
        },
        (err) => { }
      );
    } else {
      const timebar = { timeslices: [], selectedTimeslice: null, timebarLoading: false };
      this.ngRedux.dispatch({
        type: 'LOAD_TIMEBAR',
        payload: timebar
      });
    }
  }
}
