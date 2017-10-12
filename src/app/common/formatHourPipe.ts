import {Pipe, PipeTransform} from '@angular/core';

/**
 * Formatta la data nel formato hh:MM
 */
@Pipe({name: 'HHmm'})
export class FormatHourPipe implements PipeTransform {
    transform(tdate: Date, args?: any[]): string {
      if (tdate !== null) {
        const hours = tdate.getHours() < 10 ? ('0' + tdate.getHours()) : tdate.getHours();
        const minutes = tdate.getMinutes() < 10 ? ('0' + tdate.getMinutes()) : tdate.getMinutes();
        return hours + ':' + minutes;
      } else {
        return '';
      }
    }
}
