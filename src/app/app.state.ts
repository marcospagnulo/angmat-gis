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

  selectedTimeslice: number;

  // Events
  @Output() onSelectNodes: EventEmitter<any[]> = new EventEmitter();

  @Output() onTimebarLoad: EventEmitter<Timebar> = new EventEmitter();

  @Output() onTimesliceSelected: EventEmitter<number> = new EventEmitter();


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

    // Catalog node selection subscriber
    this.ngRedux.select(['catalog', 'selectedNodes']).subscribe((selectedNodes: any[]) => {
      console.log('onSelectNodes', selectedNodes);
      this.selectedNodes = Object.assign([], selectedNodes);
      this.onSelectNodes.emit(this.selectedNodes);
    });

    // Timebar subscriber
    this.ngRedux.select(['timebar']).subscribe((timebar: Timebar) => {

      console.log('onTimebarLoad', timebar);

      // Preseleziono il primo timeslice
      if (timebar.timeslices.length > 0 && timebar.selectedTimeslice === null) {
        timebar.selectedTimeslice = timebar.timeslices[0].ts;
      }

      this.timebar = timebar;
      this.onTimebarLoad.emit(timebar);
    });

    // Timeslice selection subscriber
    this.ngRedux.select(['timebar', 'selectedTimeslice']).subscribe((selectedTimeslice: number) => {
      console.log('onTimesliceSelected', selectedTimeslice);
      this.selectedTimeslice = selectedTimeslice;
      this.onTimesliceSelected.emit(selectedTimeslice);
    });

  }

}
