import { NgIf } from '@angular/common/src/directives/ng_if';
import { AppState } from '../app.state';
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { TimebarActions } from '../actions/timebar.actions';
import { Timebar } from '../store/timebar.reducer';

@Component({
  selector: 'timebar',
  template: `
    <mat-card [ngClass]="{'scale-hide': !app.timebar.timebarLoading && app.timebar.timeslices?.length <= 0,
                          'scale-show': app.timebar.timebarLoading || app.timebar.timeslices?.length > 0}">

      <!-- Loading -->
      <div *ngIf="app.timebar.timebarLoading" class="mat-spinner-container large-padding">
        <mat-spinner></mat-spinner>
      </div>

      <!-- Days -->
      <mat-tab-group *ngIf="!app.timebar.timebarLoading && app.timebar.timeslices?.length > 0" class="timebar-days">
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

      <div class="small-padding-top" *ngIf="app.selectedTimeslice !== null && !app.timebar.timebarLoading">
        <span class="text body">
          {{app.selectedTimeslice | dayOfWeek}} {{app.selectedTimeslice | ddMM}} {{app.selectedTimeslice | HHmm}}
        </span>
      </div>
    </mat-card>
`
})

export class TimebarComponent {

  selectedTimesliceIndex: number;

  productionDateText: string;

  showTimebar: boolean;

  timePerDay: Map<number, number[]> = new Map();

  constructor( public actions: TimebarActions, public app: AppState) {

    this.reloadTimebar(app.timebar);
    this.setSelectedTimesliceIndex(app.selectedTimeslice);

    // Imposto la l'indice di selezione alla selezione di un timeslice
    app.onTimesliceSelected.subscribe((selectedTimeslice: number) => {
      this.setSelectedTimesliceIndex(selectedTimeslice);
    });

    // Costruisco la barra del tempo in funzione dei timeslice caricati
    app.onTimebarLoad.subscribe((timebar: Timebar) => {
      this.reloadTimebar(timebar);
    });
  }

  /**
   * Seleziona un tima slice dalla barra del tempo
   *
   * @param selectedTimeslice
   */
  setSelectedTimesliceIndex(selectedTimeslice) {
    if (selectedTimeslice != null) {
      this.timePerDay.forEach(timeslices => {
        const index = timeslices.indexOf(selectedTimeslice);
        if (index > 0) {
          this.selectedTimesliceIndex = index;
        }
      });
    }
  }

  /**
   * Ricarica la barra del tempo
   *
   * @param timebar
   */
  reloadTimebar(timebar) {

    this.timePerDay = new Map();

    if (timebar.timeslices) {

      // Organizzo i timeslice suddividendoli per giorno
      for (const t of timebar.timeslices){

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
    }
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
