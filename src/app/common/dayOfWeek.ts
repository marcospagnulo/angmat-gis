import {Pipe, PipeTransform} from '@angular/core';

/**
 * Formatta la data(in millisecondi) nel formato hh:MM
 */
@Pipe({name: 'dayOfWeek'})
export class DayOfWeekPipe implements PipeTransform {
    transform(timeInMillis: number, args?: any[]): string {
      if (timeInMillis > 0) {
        const tdate = new Date(timeInMillis);
        const week = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
        return week[tdate.getDay()];
      } else {
        return '';
      }
    }
}
