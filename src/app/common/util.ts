import { Injectable } from '@angular/core';

@Injectable()
export class Util {

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
