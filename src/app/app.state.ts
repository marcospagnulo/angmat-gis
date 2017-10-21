import { Injectable, Output, EventEmitter } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from './store/index';
import { User } from './model/user';
import { Catalog } from './store/catalog.reducer';
import { CatalogActions } from './actions/catalog.actions';
import { Timebar } from './store/timebar.reducer';

@Injectable()
export class AppState {

  // Variables state
  user: User;

  catalog: any;

  selectedNodes: any[];

  timebar: Timebar;

  // Events
  @Output() onSelectNodes: EventEmitter<any[]> = new EventEmitter();

  @Output() onTimebarLoad: EventEmitter<Timebar> = new EventEmitter();


  constructor (private ngRedux: NgRedux<IAppState>, public catalogActions: CatalogActions) {

    catalogActions.loadCatalog();

    // User subscriber
    this.ngRedux.select(['auth', 'user']).subscribe((user: User) => {
      this.user = user;
    });

    // Catalog subscriber
    this.ngRedux.select(['catalog']).subscribe((catalog: Catalog) => {
      this.catalog = catalog;
    });

    // Timebar subscriber
    this.ngRedux.select(['timebar']).subscribe((timebar: Timebar) => {
      console.log('timebar', timebar);
      this.timebar = timebar;
      this.onTimebarLoad.emit(timebar);
    });

    // Catalog node selection subscriber
    this.ngRedux.select(['catalog', 'selectedNodes']).subscribe((selectedNodes: any[]) => {
      console.log('selectedNodes', selectedNodes);
      this.selectedNodes = selectedNodes;
      this.onSelectNodes.emit(selectedNodes);
    });
  }

}
