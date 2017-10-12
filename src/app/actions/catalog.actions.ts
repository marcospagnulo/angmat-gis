import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { IAppState } from '../store/index';
import { NgRedux } from '@angular-redux/store';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Device } from '../model/device';
import { Config } from '../config';

/**
 * Classe action per funzionalità di catalogo
 */
@Injectable()
export class CatalogActions {

  returnUrl: string;

  constructor( private ngRedux: NgRedux<IAppState>, private http: Http, private router: Router, private route: ActivatedRoute) { }

  getCatalog() {


  }

  /**
   * Carica il catalogo dei dati
   */
  loadCatalog() {

    const user = JSON.parse(localStorage.getItem('user'));
    const myHeaders = new Headers();
    myHeaders.append('userId', user.id);
    myHeaders.append('companyId', Config.COMPANY_ID);
    myHeaders.append('password', user.password);

    let catalogNodes, catalogItems;
    try {
      const nodes = localStorage.getItem('catalogNodes');
      const items = localStorage.getItem('catalogItems');
      catalogNodes = nodes !== undefined ? JSON.parse(nodes) : [];
      catalogItems = items !== undefined ? JSON.parse(items) : [];
    } catch (e) {
      console.error(e);
    }

    if (!catalogNodes && !catalogItems) {

      this.http.get(
        `${Config.API_HOST}/${Config.API_SERVICE}/${Config.API_CATALOG}`,
        new RequestOptions({ headers: myHeaders })
      ).subscribe(
        (data) => {

          const catalogResponse = data.json();
          const catalog = catalogResponse.data;
          localStorage.setItem('catalogNodes', JSON.stringify(catalog.catalog));
          localStorage.setItem('catalogItems', JSON.stringify(catalog.items));

          this.ngRedux.dispatch({ type: 'LOAD_CATALOG', payload: { catalog } });
        },
        (err) => { }
      );
    } else {
      const catalog = {catalog: catalogNodes, items: catalogItems, selectedNodes: []};
      this.ngRedux.dispatch({ type: 'LOAD_CATALOG', payload: { catalog } });
    }
  }

  /**
   * Scarica la barra del tempo in base ai nodi di catalogo selezionati
   *
   * @param nodes - nodi di catalogo selezionati
   */
  loadTimebar(nodes) {

    const user = JSON.parse(localStorage.getItem('user'));
    const myHeaders = new Headers();
    myHeaders.append('userId', user.id);
    myHeaders.append('companyId', Config.COMPANY_ID);
    myHeaders.append('password', user.password);

    const options = new RequestOptions({ headers: myHeaders });


    if (nodes && nodes.length > 0) {

      this.ngRedux.dispatch({
        type: 'LOADING_TIMEBAR',
        payload: true
      });

      let url = `${Config.API_HOST}/${Config.API_SERVICE}/${Config.API_CATALOG_TIMESLICES}`;
      url = url + nodes.join(',');
      this.http.get(url, options).subscribe(
        (response) => {
          const timebar = response.json().data;
          this.ngRedux.dispatch({
            type: 'LOAD_TIMEBAR',
            payload: { timebar }
          });
        },
        (err) => { }
      );
    } else {
      this.ngRedux.dispatch({
        type: 'LOAD_TIMEBAR',
        payload: { }
      });
    }
  }

  /**
   * Toggle di selezione su un nodo di catalogo
   *
   * @param node - nodo di catalogo
   * @param selected - indica se il nodo è stato selezionato o deselzionato
   */
  selectLeaf(node, selected) {
    this.ngRedux.dispatch({
      type: selected ? 'REMOVE_SELECT_NODE' : 'ADD_SELECT_NODE',
      payload: { node }
    });
  }

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
}
