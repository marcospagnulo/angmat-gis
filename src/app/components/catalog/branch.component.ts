import { Component, Input } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/index';
import { CatalogActions } from '../../actions/catalog.actions';

@Component({
  selector: 'branch',
  template: `

    <mat-list-item>

      <!-- Catalog node -->
      <button mat-icon-button
        *ngIf="!node.leaf"
        (click)="toggleNode()">
        <mat-icon>{{open ? 'folder_open' : 'folder'}}</mat-icon>
      </button>
      <span *ngIf="!node.leaf"
        class="text body">
        {{node.title}}
      </span>

      <!-- Catalog leaf -->
      <mat-checkbox class="text body"
        mat-list-icon
        (click)="actions.selectLeaf(node, selected)"
        *ngIf="node.leaf"
        [(ngModel)]="selected">
        {{node.title}}
      </mat-checkbox>
    </mat-list-item>

    <!-- Catalog node children -->
    <mat-list *ngIf="node.children"
      [ngClass]="{'mat-show': open, 'mat-hide': !open}">
      <branch mat-list-item
        *ngFor="let node of node.children"
        [node]='node'>
      </branch>
    </mat-list>
`
})

export class BranchComponent {

  @Input() node: any;

  open: boolean;

  selected: boolean;

  constructor( private ngRedux: NgRedux<IAppState>, public actions: CatalogActions) { }

  /**
   * Apre/chiude un nodo del catalogo
   */
  toggleNode() {
    this.open = !this.open;
  }
}
