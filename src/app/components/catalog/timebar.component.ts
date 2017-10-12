import { Component, Input, ViewChild } from '@angular/core';
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
      <mat-tab-group #timebarTabs *ngIf="!(timebar | async).timebarLoading" class="timebar-days">
        <mat-tab *ngFor="let d of days">
          <ng-template mat-tab-label>
            <span class="text subhead">{{d}}</span>
          </ng-template>
          <!-- Hours per day-->
          <mat-tab-group class="timebar-hours">
            <mat-tab *ngFor="let h of timePerDay[d]">
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

  @ViewChild('timebarTabs') timebarTabs;

  @select(['catalog', 'selectedNodes']) selectedNodes;

  @select('timebar') timebar;

  @select(['timebar', 'timeslices']) timeslices;

  @select(['timebar', 'selectedTimeslice']) selectedTimeslice;

  productionDateText: string;

  showTimebar: boolean;

  days: string[];

  timePerDay: string[][] = [];

  constructor( private ngRedux: NgRedux<IAppState>, public actions: CatalogActions) {

    this.selectedNodes.subscribe((selectedNodes: any[]) => {
      this.actions.selectTimeslice(null);
    });

    // Costruisco la barra del tempo in funzione dei timeslice caricati
    this.timeslices.subscribe((timeslices: Array<any>) => {

      if (timeslices) {

        // Itero i timeslice e costruisco una mappa con chiave il giorno di appartenenza il timeslice iterato
        for (const t of timeslices){

          // la chiave della mappa è in MM/dd/yyyy
          const tdate = new Date(t.ts);
          const keyDate = new Date (0);
          keyDate.setDate(tdate.getDate());
          keyDate.setMonth(tdate.getMonth());
          keyDate.setFullYear(tdate.getFullYear());
          const key = this.formatDateDDMM(keyDate);

          if (this.timePerDay[key]) {
            this.timePerDay[key].push(tdate);
          } else {
            this.timePerDay[key] = [tdate];
            this.days.push(key);
          }
        }
      } else {
        this.timePerDay = [];
        this.days = [];
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

  /**
   * Formatta una data nel formato dd/MM
   */
  formatDateDDMM(tdate) {
    const day = tdate.getDay() < 10 ? ('0' + tdate.getDay()) : tdate.getDay();
    const month = tdate.getMonth() < 10 ? ('0' + tdate.getMonth()) : tdate.getMonth();
    return day + '/' + month;
  }

  /**
   * Formatta una data nel formato dd/MM
   */
  formatDateHHmm(tdate) {
    const hours = tdate.getHours() < 10 ? ('0' + tdate.getHours()) : tdate.getHours();
    const minutes = tdate.getMinutes() < 10 ? ('0' + tdate.getMinutes()) : tdate.getMinutes();
    return hours + ':' + minutes;
  }

}
