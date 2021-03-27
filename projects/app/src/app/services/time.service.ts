import { EventEmitter, Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private timestamp: number;
  public tick: EventEmitter<Date> = new EventEmitter();

  constructor(private settings: SettingsService) {
    let d = new Date(Date());
    this.timestamp = d.valueOf();
    setInterval(() => { this.setTick(); }, 1000);
  }

  setTick() {
    let speed = 1;
    if (this.settings.demo) {
      speed = this.settings.speed;
    }
    this.timestamp += speed * 1000;
    const date = new Date(this.timestamp);
    this.tick.emit(date);
  }
}
