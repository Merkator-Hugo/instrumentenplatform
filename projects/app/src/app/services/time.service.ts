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
    let d = new Date(Date());
    this.timestamp = d.valueOf();
    setInterval(() => { this.setTick(); }, 1000);
    this.stateData = {
      demo: false,
      title: '',
      speed: 1,
    };
    this.state.changed.subscribe((data) => {
      this.stateData = data;
    })
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
}
