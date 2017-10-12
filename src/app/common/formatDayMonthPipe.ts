import {Pipe, PipeTransform} from '@angular/core';

/**
 * Formatta la data (in millisecondi) nel formato dd/MM
 */
@Pipe({name: 'ddMM'})
export class FormatDayMonthPipe implements PipeTransform {
    transform(timeInMillis: number, args?: any[]): string {
      if (timeInMillis > 0) {
        const tdate = new Date(timeInMillis);
        const day = tdate.getDay() < 10 ? ('0' + tdate.getDay()) : tdate.getDay();
        const month = tdate.getMonth() < 10 ? ('0' + tdate.getMonth()) : tdate.getMonth();
        return day + '/' + month;
      } else {
        return '';
      }
    }
}
