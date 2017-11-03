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
    <mat-card *ngIf="selectedNodes.length > 0" class="bottom left"
      [ngClass]="{'minimized': state === 'minimized','maximized': state === 'maximized'}">

      <!-- Card toggle -->
      <div class="card-toggle right">
        <button class="minimize-button" mat-icon-button (click)="toggleSize()">
          <span class="fa text fa-minus"></span>
        </button>
        <button class="maximize-button" mat-icon-button (click)="toggleSize()">
          <mat-icon mat-list-icon class="black">layers</mat-icon>
        </button>
      </div>

      <div class="inner-container">

        <!-- Card title -->
        <span class="text title">Livelli attivi</span>

        <div [dragula]="'layers'" [dragulaOptions]="dragulaOption" [dragulaModel]="selectedNodes">
          <div class="map-layers-item" *ngFor="let node of selectedNodes">
            <!-- Title -->
            <span class="map-layers-item-label text body truncate" mat-line>{{node.title}}</span>
            <!-- Settings -->
            <button mat-icon-button>
              <mat-icon class="black">build</mat-icon>
            </button>
            <!-- Delete -->
            <button mat-icon-button (click)="catalogActions.toggleNode(node, true)">
              <mat-icon class="black">delete</mat-icon>
            </button>
            <!-- Drag -->
            <div class="mat-icon-button">
              <mat-icon class="drag-anchor black">open_with</mat-icon>
            </div>
          </div>
        </div>
      </div>
    </mat-card>
`
})

export class MapLayersComponent {

  state = 'maximized';

  selectedNodes: any[] = [];

  dragulaOption: any = {
    moves: function (el, container, handle) {
      return handle.classList.contains('drag-anchor');
    }
  };

  constructor(public app: AppState, public catalogActions: CatalogActions, private dragulaService: DragulaService) {

    app.onSelectNodes.subscribe((nodes) => {
      this.selectedNodes = [];
      let i = nodes.length - 1;
      for (const node of nodes) {
        this.selectedNodes[i] = node;
        i--;
      }
    });

    dragulaService.drop.subscribe((value) => {
      catalogActions.reorderSelectedNodes(this.selectedNodes);
    });

  }

  /**
   * Effettua il toggle sullo stato minimizzato/massimizzato  della card
   */
  toggleSize() {
    this.state = this.state === 'minimized' ? 'maximized' : 'minimized';
  }

}
