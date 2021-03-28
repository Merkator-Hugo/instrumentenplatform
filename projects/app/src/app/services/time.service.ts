import { EventEmitter, Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private timestamp: number;
  public tick: EventEmitter<Date> = new EventEmitter();
  private stateData: any;

  constructor(private state: StateService) {
    this.stateData = {
      demo: false,
      title: '',
      speed: 1,
    };
    this.resetTime();
    setInterval(() => { this.setTick(); }, 1000);
    this.state.changed.subscribe((data) => {
      this.stateData = data;
    })
  }

  resetTime() {
    let d = new Date(Date());
    if (this.stateData.demo) {
      d.setFullYear(2015);
    }
    this.timestamp = d.valueOf();
  }

  setTick() {
    let speed = 1;
    if (this.stateData.demo) {
      speed = this.stateData.speed;
    }
    this.timestamp += speed * 1000;
    const date = new Date(this.timestamp);
    this.tick.emit(date);
  }

  getNow(): Date {
    const now = new Date(this.timestamp);
    return now;
  }

}
