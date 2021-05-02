import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { createLocation } from 'astronomy-bundle/earth';
import Location from 'astronomy-bundle/earth/Location';
import { createMoon } from 'astronomy-bundle/moon';
import Moon from 'astronomy-bundle/moon/Moon';
import { createSun } from 'astronomy-bundle/sun';
import Sun from 'astronomy-bundle/sun/Sun';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import TimeOfInterest from 'astronomy-bundle/time/TimeOfInterest';
import * as moment from 'moment';
import { DataType } from '../models/enums';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AstronomyService {
  // INFO: https://github.com/andrmoel/astronomy-bundle-js#readme

  private now: Date;
  private toi: TimeOfInterest;
  private toi_next: TimeOfInterest;
  private location: Location;

  private WEEKDAYS_SHORT = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
  private WEEKDAYS_LONG = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];

  private sunData = {
    type: DataType.SUN,
    values: [0],
    items: [
      { label: '', tooltip: '', value: '-', unit: '' },
      { label: '', tooltip: '', value: '-', unit: '' },
      { label: '', tooltip: '', value: '-', unit: '' },
      { label: '', tooltip: '', value: '-', unit: '' }
    ]
  };

  private moonData = {
    type: DataType.MOON,
    values: [0],
    items: [
      { label: '', tooltip: '', value: '-', unit: '' },
      { label: '', tooltip: '', value: '-', unit: '' },
      { label: '', tooltip: '', value: '-', unit: '' },
      { label: '', tooltip: '', value: '-', unit: '' }
    ]
  };

  constructor(private settings: SettingsService) {
    const here = this.settings.getLocation();
    this.location = createLocation(here[0], here[1]);
   }

  setDateTime(datetime: Date) {
    this.now = datetime;
    this.toi = createTimeOfInterest.fromDate(datetime);
    this.toi_next = createTimeOfInterest.fromDate(moment(datetime).add(5, 'd').toDate());
    this.initSunData();
    this.initMoonData();
  }

  getNow(): Date {
    return this.now;
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
        if (m) {
        return this.toi.getLocalMeanSiderealTime(this.location).toFixed(f);
      } else {
        return this.toi.getLocalApparentSiderealTime(this.location).toFixed(f)
      }
    } else {
      if (m) {
        return this.toi.getGreenwichMeanSiderealTime().toFixed(f);
      } else {
        return this.toi.getGreenwichApparentSiderealTime().toFixed(f)
      }
    }
  }

  getSunData() {
    return this.sunData;
  }

  private initSunData() {
    const toi = this.toi;
    const sun = createSun(toi);
    Promise.all([
          sun.getRise(this.location),
          sun.getSet(this.location),
      ])
      .then((res) => {
        const rise = this.ShowLocaleTime(res[0]);
        const set = this.ShowLocaleTime(res[1]);
        const items = [];
        items.push({ label: '', tooltip: '', value: '-', unit: '' })
        items.push({ label: '', tooltip: '', value: '-', unit: '' })
        items.push({ label: 'Op', tooltip: 'Zon op om', value: rise, unit: '' })
        items.push({ label: 'Onder', tooltip: 'Zon onder om', value: set, unit: '' })
        this.sunData = {
          type: DataType.SUN,
          values: [0],
          items: items
        };
      });
    }


  getMoonData() {
    return this.moonData;
  }

  private initMoonData() {
    const toi = this.toi;
    const moon = createMoon(toi);
    const moon_next = createMoon(this.toi_next);
    Promise.all([
          moon.getIlluminatedFraction(),
          moon.isWaxing(),
          moon.getRise(this.location),
          moon.getSet(this.location),
          moon_next.getSet(this.location),
      ])
      .then((res) => {
        const phase = this.getPhase(res[0], res[1]);
        const fraction = (res[0] * 100).toFixed(0);
        const waxing = (res[1]) ? 'wassend' : 'afnemend';
        const rise = this.ShowLocaleTime(res[2]);
        const set = (res[3].time.hour < res[2].time.hour) ? '* ' + this.ShowLocaleTime(res[4]) : this.ShowLocaleTime(res[3]);
        let phases = [
          {
            order: (moon.getUpcomingFirstQuarter().getDayOfYear() - toi.getDayOfYear()),
            object: { label: 'EK', tooltip: '', value: this.showDate(moon.getUpcomingFirstQuarter().getDate()), unit: '' }
          },
          {
            order: (moon.getUpcomingFullMoon().getDayOfYear() - toi.getDayOfYear()),
            object: { label: 'VM', tooltip: '', value: this.showDate(moon.getUpcomingFullMoon().getDate()), unit: '' }
          },
          {
            order: (moon.getUpcomingLastQuarter().getDayOfYear() - toi.getDayOfYear()),
            object: { label: 'LK', tooltip: '', value: this.showDate(moon.getUpcomingLastQuarter().getDate()), unit: '' }
          },
          {
            order: (moon.getUpcomingNewMoon().getDayOfYear() - toi.getDayOfYear()),
            object: { label: 'NM', tooltip: '', value: this.showDate(moon.getUpcomingNewMoon().getDate()), unit: '' }
          }
        ];
        phases.sort((a, b) => { return (a.order > b.order) ? 1 : -1; });
        const items = [];
        items.push({ label: '', tooltip: '', value: fraction, unit: ' % ' + waxing })
        // phases.forEach((p) => { items.push(p.object) });
        items.push({ label: '', tooltip: '', value: '-', unit: '' })
        items.push({ label: 'Op', tooltip: 'Maan op om', value: rise, unit: '' })
        items.push({ label: 'Onder', tooltip: 'Maan onder om', value: set, unit: '' })
        items.splice(4);
        this.moonData = {
          type: DataType.MOON,
          values: [phase],
          items: items
        };
      });
  }

  private getPhase(fraction: number, waxing: boolean): number {
    if (waxing) {
      return (Math.floor((fraction * 14)));
    } else {
      return (Math.floor( (1-fraction) * 14) + 14);
    }
  }

  private showDate(date: Date): string {
    let YYYY = date.getFullYear().toString();
    let MM = (date.getMonth() > 8) ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1).toString();
    let DD = (date.getDate() > 9) ? date.getDate().toString() : '0' + date.getDate().toString();
    return DD + '-' + MM + '-' + YYYY;
  }

  private ShowLocaleTime(time: TimeOfInterest): string {
    const offset = this.now.getTimezoneOffset();
    const h = time.time.hour - (offset / 60);
    const hour = (h < 24) ? h :  h - 24;
    const min = time.time.min;
    const sec = time.time.sec;
    return hour + ':' + min + ':' + sec;
  }



}


