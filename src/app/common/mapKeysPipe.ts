import {Pipe, PipeTransform} from '@angular/core';

/**
 * Ritorna le chiavi di una mappa
 */
@Pipe({name: 'mapKeys'})
export class MapKeysPipe implements PipeTransform {
  transform(value: any, args?: any[]): Object[] {
      const keys = [];
      value.forEach((entryVal, entryKey) => {
        keys.push(entryKey);
      });
      return keys;
  }
}
