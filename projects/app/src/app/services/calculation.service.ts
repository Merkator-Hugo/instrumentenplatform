import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  beaufort: any[];

  constructor() {
    this.beaufort = [
      {value: 0, name: 'stil', minspeed: 0, maxspeed: 1, description: 'rook stijgt recht of bijna recht omhoog'},
      {value: 1, name: 'zwak', minspeed: 1, maxspeed: 5, description: 'windrichting goed af te leiden uit rookpluimen'},
      {value: 2, name: 'zwak', minspeed: 6, maxspeed: 11, description: 'wind merkbaar in gezicht'},
      {value: 3, name: 'matig', minspeed: 12, maxspeed: 19, description: 'stof waait op'},
      {value: 4, name: 'matig', minspeed: 20, maxspeed: 28, description: 'haar in de war, kleding flappert'},
      {value: 5, name: 'vrij krachtig', minspeed: 29, maxspeed: 38, description: 'opwaaiend stof hinderlijk voor de ogen, gekuifde golven op meren en kanalen en vuilcontainers waaien om'},
      {value: 6, name: 'krachtig', minspeed: 39, maxspeed: 49, description: 'paraplu\'s met moeite vast te houden'},
      {value: 7, name: 'hard', minspeed: 50, maxspeed: 61, description: 'lastig tegen de wind in te lopen of fietsen'},
      {value: 8, name: 'stormachtig', minspeed: 62, maxspeed: 74, description: 'voortbewegen zeer moeilijk'},
      {value: 9, name: 'storm', minspeed: 75, maxspeed: 88, description: 'schoorsteenkappen en dakpannen waaien weg, kinderen waaien om'},
      {value: 10, name: 'zware storm', minspeed: 89, maxspeed: 102, description: 'grote schade aan gebouwen, volwassenen waaien om'},
      {value: 11, name: 'zeer zware storm', minspeed: 103, maxspeed: 117, description: 'enorme schade aan bossen'},
      {value: 12, name: 'orkaan', minspeed: 117, maxspeed: 999, description: 'verwoestingen'}
    ];
  }

  toBeaufort(speed: number): any {
    return this.beaufort.filter((b) => ((speed >= b.minspeed) && (speed < b.maxspeed)))[0];
  }

}
