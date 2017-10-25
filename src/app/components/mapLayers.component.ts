import { CatalogActions } from '../actions/catalog.actions';
import { AppState } from '../app.state';
import { style } from '@angular/animations';
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'map-layers',
  styleUrls: ['../../../node_modules/dragula/dist/dragula.css'],
  template: `
    <mat-card>
      <span class="text title">Livelli attivi</span>
      <div [dragula]="'layers'" [dragulaOptions]="dragulaOption" [dragulaModel]="this.selectedNodes">
        <div class="map-layers-item" *ngFor="let node of this.selectedNodes">
          <span class="text body" mat-line>{{node.title}}</span>
          <mat-icon class="drag-anchor black">open_with</mat-icon>
        </div>
      </div>
    </mat-card>
`
})

export class MapLayersComponent {

  selectedNodes: any[] = [];

  dragulaOption: any = {
    moves: function (el, container, handle) {
      return handle.classList.contains('drag-anchor');
    }
  };

  constructor(public app: AppState, private catalogActions: CatalogActions, private dragulaService: DragulaService) {

    app.onSelectNodes.subscribe((nodes) => {
      console.log('onSelectNodes', nodes);
      this.selectedNodes = [];
      let i = 0;
      for (const node of nodes) {
        this.selectedNodes[i] = node;
        i++;
      }
    });

    dragulaService.drop.subscribe((value) => {
      console.log('reorderSelectedNodes', this.selectedNodes);
      catalogActions.reorderSelectedNodes(this.selectedNodes);
    });

  }

}
