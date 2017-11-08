import {Pipe, PipeTransform} from '@angular/core';

/**
 * Formatta la data(in millisecondi) nel formato hh:MM
 */
@Pipe({name: 'HHmm'})
export class FormatHourPipe implements PipeTransform {
    transform(timeInMillis: number, args?: any[]): string {
      if (timeInMillis > 0) {
        const tdate = new Date(timeInMillis);
        const hours = tdate.getHours() < 10 ? ('0' + tdate.getHours()) : tdate.getHours();
        const minutes = tdate.getMinutes() < 10 ? ('0' + tdate.getMinutes()) : tdate.getMinutes();
        return hours + ':' + minutes;
      } else {
        return '';
      }
    }
}
