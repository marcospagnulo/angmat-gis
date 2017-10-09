import { Component, Input } from '@angular/core';
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
      <mat-tab-group>
        <mat-tab *ngFor="let d of days">
          <ng-template mat-tab-label>
            <span class="text body">{{d}}</span>
          </ng-template>
          <div>{{timePerDay[d]}}</div>
        </mat-tab>
      </mat-tab-group>
      <!-- Timelice per day -->

    </mat-card>
`
})

export class TimebarComponent {

  @select('timebar') timebar;

  showTimebar: boolean;

  days: string[];

  timePerDay: string[][] = [];

  constructor( private ngRedux: NgRedux<IAppState>, public actions: CatalogActions) {

    // Costruisco la barra del tempo in funzione dei timeslice caricati
    this.ngRedux.select(['timebar']).subscribe((timebar: Timebar) => {

      if (timebar.timeslices) {

        // Itero i timeslice e costruisco una mappa con chiave il giorno di appartenenza il timeslice iterato
        for (const t of timebar.timeslices){

          // la chiave della mappa è in MM/dd/yyyy
          const tdate = new Date(t.ts);
          const keyDate = new Date (0);
          keyDate.setDate(tdate.getDate());
          keyDate.setMonth(tdate.getMonth());
          keyDate.setFullYear(tdate.getFullYear());
          const key = this.formatDateDDMM(keyDate.getTime());

          if (this.timePerDay[key]) {
            this.timePerDay[key].push(this.formatDateHHmm(tdate));
          } else {
            this.timePerDay[key] = [this.formatDateHHmm(tdate)];
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
