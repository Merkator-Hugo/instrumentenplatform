import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  celsiusToFahrenheit(celsius: number): number {
    return celsius;
  }

  fahrenheitToCelsius(fahrenheit: number): number {
    return fahrenheit;
  }

  gevoelstemperatuur(temperatuur: number, windsnelheid: number): number {
    return temperatuur;
  }
}
