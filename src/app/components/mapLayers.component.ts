import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';

@Component({
  selector: 'map-layers',
  template: `
    <mat-card>
      <span class="text title">Livelli attivi</span>
      <mat-list *ngFor="let node of (selectedNodes | async)">
        <mat-list-item>{{node.title}}</mat-list-item>
      </mat-list>
    </mat-card>
`
})

export class MapLayersComponent {

  @select(['catalog', 'selectedNodes']) selectedNodes;

  constructor( private ngRedux: NgRedux<IAppState>) {

    this.selectedNodes.subscribe((selectedNodes: any[]) => {
      console.log('selectedNodes', selectedNodes);
    });
  }

}
