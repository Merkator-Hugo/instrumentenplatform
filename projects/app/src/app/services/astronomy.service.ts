import { Injectable } from '@angular/core';
import { createLocation } from 'astronomy-bundle/earth';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import TimeOfInterest from 'astronomy-bundle/time/TimeOfInterest';
import * as moment from 'moment';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AstronomyService {

  private now: Date;
  private toi: TimeOfInterest;

  private WEEKDAYS_SHORT = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
  private WEEKDAYS_LONG = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];

  constructor(private settings: SettingsService) { }

  setDateTime(datetime: Date) {
    this.now = datetime;
    this.toi = createTimeOfInterest.fromDate(datetime);
  }

  getWeekday(long: boolean) {
    if (long) {
      return this.WEEKDAYS_LONG[this.now.getDay()];
    } else {
      return this.WEEKDAYS_SHORT[this.now.getDay()];
    }
  }

  getDate(): string {
    return moment(this.now).format('DD-MM-YY');
  }

  getTime(): string {
    return moment(this.now).format('HH:mm:ss');
  }

  getJulianDate(fix?: number): string {
    const f = (fix == undefined) ? 2 : fix;
    return this.toi.getJulianDay().toFixed(f);
  }

  getSideralTime(fix?: number, local?: boolean, mean?: boolean): string {
    const l = (local == undefined) ? false : local;
    const m = (mean == undefined) ? false : mean;
    const f = (fix == undefined) ? 2 : fix;
    if (l) {
      const here = this.settings.getLocation();
      const location = createLocation(here[0], here[1]);
        if (m) {
        return this.toi.getLocalMeanSiderealTime(location).toFixed(f);
      } else {
        return this.toi.getLocalApparentSiderealTime(location).toFixed(f)
      }
    } else {
      if (m) {
        return this.toi.getGreenwichMeanSiderealTime().toFixed(f);
      } else {
        return this.toi.getGreenwichApparentSiderealTime().toFixed(f)
      }
    }
  }

}
