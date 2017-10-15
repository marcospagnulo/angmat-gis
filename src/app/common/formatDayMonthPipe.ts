import {Pipe, PipeTransform} from '@angular/core';

/**
 * Formatta la data (in millisecondi) nel formato dd/MM
 */
@Pipe({name: 'ddMM'})
export class FormatDayMonthPipe implements PipeTransform {
    transform(timeInMillis: number, args?: any[]): string {
      if (timeInMillis > 0) {
        const tdate = new Date(timeInMillis);
        const day = tdate.getDate() < 10 ? ('0' + tdate.getDate()) : tdate.getDate();
        const month = tdate.getMonth() < 9 ? ('0' + (tdate.getMonth() + 1)) : tdate.getMonth() + 1;
        return day + '/' + month;
      } else {
        return '';
      }
    }
}
