import { AppState } from '../../app.state';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IAppState } from '../../store/index';
import { CatalogActions } from '../../actions/catalog.actions';

/**
 * Il componente disegna un nodo di catalogo e ne permette la selezione
 */
@Component({
  selector: 'branch',
  template: `

    <button class="truncate" mat-list-item mat-button (click)="toggleNode()">

      <!-- Catalog node -->
      <mat-icon mat-list-icon
        class="black"
        *ngIf="!node.leaf">
        {{open ? 'folder_open' : 'folder'}}
      </mat-icon>
      <span mat-line *ngIf="!node.leaf"
        class="text body catalog-node-label">
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
    </button>

    <!-- Catalog node children -->
    <div #children class="mat-hide">
      <mat-list *ngIf="node.children && open">
        <branch button
          *ngFor="let node of node.children"
          [node]='node'>
        </branch>
      </mat-list>
    </div>
`
})

export class BranchComponent implements OnInit {

  @Input() node: any;

  open: boolean;

  selected: boolean;

  @ViewChild('children') children;

  constructor( public app: AppState, public actions: CatalogActions) { }

  ngOnInit() {
    this.selected = this.isSelected(this.node.id);
  }

  /**
   * Setta lo stato selezionato ad un nodo di catalogo
   *
   * @param id - identificativo nodo catalogo
   */
  isSelected(id) {
    const res = this.app.selectedNodes.find( node => node.id === id);
    return this.app.selectedNodes.find( node => node.id === id) !== undefined;
  }

  /**
   * Apre/chiude un nodo del catalogo
   */
  toggleNode() {
    this.open = !this.open;
    this.children.nativeElement.className = this.open ? 'mat-show' : 'mat-hide';
  }
}
