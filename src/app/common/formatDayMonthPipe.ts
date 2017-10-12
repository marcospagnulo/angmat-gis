import {Pipe, PipeTransform} from '@angular/core';

/**
 * Formatta la data nel formato dd/MM
 */
@Pipe({name: 'ddMM'})
export class FormatDayMonthPipe implements PipeTransform {
    transform(tdate: Date, args?: any[]): string {
      if (tdate !== null) {
        const day = tdate.getDay() < 10 ? ('0' + tdate.getDay()) : tdate.getDay();
        const month = tdate.getMonth() < 10 ? ('0' + tdate.getMonth()) : tdate.getMonth();
        return day + '/' + month;
      } else {
        return '';
      }
    }
}
