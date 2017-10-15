import { Injectable } from '@angular/core';

@Injectable()
export class Util {

  /**
   * Formatta una data nel formato dd/MM
   */
  formatTimesliceDate(t) {
    const tdate = new Date(t);
    const day = tdate.getUTCDate() < 10 ? ('0' + tdate.getUTCDate()) : tdate.getUTCDate();
    const month = tdate.getUTCMonth() < 9 ? ('0' + (tdate.getUTCMonth() + 1)) : tdate.getUTCMonth() + 1;
    return tdate.getFullYear() + '' + month + '' + day;
  }

  /**
   * Formatta una data nel formato dd/MM
   */
  formatTimesliceTime(t) {
    const tdate = new Date(t);
    const hours = tdate.getUTCHours() < 10 ? ('0' + tdate.getUTCHours()) : tdate.getUTCHours();
    const minutes = tdate.getUTCMinutes() < 10 ? ('0' + tdate.getUTCMinutes()) : tdate.getUTCMinutes();
    return hours + '' + minutes;
  }
}
