import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/index';
import { CatalogActions } from '../../actions/catalog.actions';
import { Timebar } from '../../store/timebar.reducer';

@Component({
  selector: 'timebar',
  template: `
    <mat-card *ngIf="( (timebar | async).timebarLoading || (timebar | async).timeslices?.length > 0 )">

      <!-- Loading -->
      <div *ngIf="(timebar | async).timebarLoading" class="mat-spinner-container large-padding">
        <mat-spinner></mat-spinner>
      </div>

      <!-- Days -->
      <mat-tab-group *ngIf="!(timebar | async).timebarLoading" class="timebar-days">
        <mat-tab *ngFor="let day of timePerDay | mapKeys">
          <ng-template mat-tab-label>
            <span class="text subhead">{{day | ddMM}}</span>
          </ng-template>
          <!-- Hours per day-->
          <mat-tab-group [(selectedIndex)]="selectedTimesliceIndex" class="timebar-hours">
            <mat-tab *ngFor="let h of timePerDay.get(day)">
              <ng-template mat-tab-label>
                <span (click)="selectTimeslice(h)" class="text body">{{h | HHmm}}</span>
              </ng-template>
            </mat-tab>
          </mat-tab-group>
        </mat-tab>
      </mat-tab-group>

      <div>
        <span class="text body fleft">{{selectedTimeslice | async | HHmm}}</span>
        <span class="text body fright">{{productionDateText}}</span>
        <span class="clear"></span>
      </div>
    </mat-card>
`
})

export class TimebarComponent {

  @select(['catalog', 'selectedNodes']) selectedNodes;

  @select('timebar') timebar;

  @select(['timebar', 'timeslices']) timeslices;

  @select(['timebar', 'selectedTimeslice']) selectedTimeslice;

  selectedTimesliceIndex: number;

  productionDateText: string;

  showTimebar: boolean;

  timePerDay: Map<number, number[]> = new Map();

  constructor( private ngRedux: NgRedux<IAppState>, public actions: CatalogActions) {

    // Imposto la l'indice di selezione alla selezione di un timeslice
    this.selectedTimeslice.subscribe((selectedTimeslice: number) => {
      this.timePerDay.forEach(timeslices => {
        const index = timeslices.indexOf(selectedTimeslice);
        if (index > 0) {
          this.selectedTimesliceIndex = index;
        }
      });
    });

    // Costruisco la barra del tempo in funzione dei timeslice caricati
    this.timeslices.subscribe((timeslices: Array<any>) => {

      if (timeslices) {

        // Organizzo i timeslice suddividendoli per giorno
        for (const t of timeslices){

          const tdate = new Date(t.ts);
          const keyDate = new Date (0);
          keyDate.setDate(tdate.getDate());
          keyDate.setMonth(tdate.getMonth());
          keyDate.setFullYear(tdate.getFullYear());

          if (this.timePerDay.get(keyDate.getTime())) {
            this.timePerDay.get(keyDate.getTime()).push(t.ts);
          } else {
            this.timePerDay.set(keyDate.getTime(), [t.ts]);
          }
        }
      } else {
        this.timePerDay = new Map();
      }
    });
  }

  /**
   * Imposta il timeslice selezionato
   *
   * @param h - timeslice
   */
  selectTimeslice(h) {
    this.actions.selectTimeslice(h);
  }

}
