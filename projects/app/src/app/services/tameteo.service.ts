import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { DataType } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class TameteoService {

  private URL = 'http://api.tameteo.nl/index.php?api_lang=nl';
  private VINKEL = '187354';
  private SCHAIJK = '187410';
  private APIKEY = 'rz98ra87zxjx';

  public forecastChanged: EventEmitter<any> = new EventEmitter();

  private forecast = [];

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    this.http.get('http://hugozalm.nl/api/tameteo/uur/' + this.VINKEL)
      .subscribe((data) => {
        console.log(data);
        Object.entries(data['day']).forEach((day) => {
            this.forecast.push({
              date: day[1]['date'],
              time: day[1]['local_time'],
              timeoffset: day[1]['local_time_offset'],
              name: day[1]['name'],
              symbol: day[1]['symbol_value'],
              description: day[1]['symbol_description'],
              symbol2: day[1]['symbol_value2'],
              description2: day[1]['symbol_description2'],
              tempmin: day[1]['tempmin'],
              tempmax: day[1]['tempmax'],
              tempunit: day[1]['units']['temp'],
              windspeed: day[1]['wind']['speed'],
              windunit: day[1]['units']['wind'],
              windsymbol: day[1]['wind']['symbol'],
              windgusts: day[1]['wind']['gusts'],
              windsymbol2: day[1]['wind']['symbolB'],
              rain: day[1]['rain'],
              rainunit: day[1]['units']['rain'],
              humidity: day[1]['humidity'],
              pressure: day[1]['pressure'],
              pressureunit: day[1]['units']['pressure'],
              snowline: day[1]['snowline'],
              snowlineunit: day[1]['units']['snowline'],
              uvindex: day[1]['uv_index_max'],
              moonin: day[1]['moon']['in'],
              moonout: day[1]['moon']['out'],
              moonlumi: day[1]['moon']['lumi'],
              moondesc: day[1]['moon']['desc'],
              moonsymbol: day[1]['moon']['symbol'],
              sunin: day[1]['sun']['in'],
              sunmid: day[1]['sun']['mid'],
              sunout: day[1]['sun']['out']
            })
        });
      })
  }


  getData7() {
    this.http.get('http://hugozalm.nl/api/tameteo/' + this.VINKEL)
      .subscribe((data) => {
        console.log(data);
        Object.entries(data['day']).forEach((day) => {
            this.forecast.push({
              date: day[1]['date'],
              name: day[1]['name'],
              description: day[1]['symbol_description'],
              tempmin: day[1]['tempmin'],
              tempmax: day[1]['tempmax'],
              windspeed: day[1]['wind']['speed'],
              rain: day[1]['rain'],
              humidity: day[1]['humidity'],
              pressure: day[1]['pressure']
            })
        });
      })
  }

  getData5() {
    this.http.get('http://hugozalm.nl/api/tameteo/uur/' + this.VINKEL)
      .subscribe((data) => {
        console.log(data);
        Object.entries(data['day']).forEach((day) => {
            this.forecast.push({
              date: day[1]['date'],
              name: day[1]['name'],
              description: day[1]['symbol_description'],
              tempmin: day[1]['tempmin'],
              tempmax: day[1]['tempmax'],
              windspeed: day[1]['wind']['speed'],
              rain: day[1]['rain'],
              humidity: day[1]['humidity'],
              pressure: day[1]['pressure']
            })
        });
      })
  }


  getDataFout() {
    this.http.get('http://api.tameteo.nl/index.php?api_lang=nl&localidad=187354&affiliate_id=rz98ra87zxjx&v=3.0')
      .subscribe((data) => {
        console.log(data);
        Object.entries(data['day']).forEach((day) => {
            this.forecast.push({
              date: day[1]['date'],
              name: day[1]['name'],
              description: day[1]['symbol_description'],
              tempmin: day[1]['tempmin'],
              tempmax: day[1]['tempmax'],
              windspeed: day[1]['wind']['speed'],
              rain: day[1]['rain'],
              humidity: day[1]['humidity'],
              pressure: day[1]['pressure']
            })
        });
      })
  }

  getForecast() {
    return {
      type: DataType.FORECAST,
      values: [0],
      items: this.forecast
    };
  }

  getForecastItems() {
    const tempmin = (this.forecast[0] && this.forecast[0].tempmin) ? this.forecast[0].tempmin : '-';
    const tempmax = (this.forecast[0] && this.forecast[0].tempmax) ? this.forecast[0].tempmax : '-';
    const windspeed = (this.forecast[0] && this.forecast[0].windspeed) ? this.forecast[0].windspeed : '-';
    const rain = (this.forecast[0] && this.forecast[0].rain) ? this.forecast[0].rain : '-';
    const pressure = (this.forecast[0] && this.forecast[0].pressure) ? this.forecast[0].pressure : '-';
    // const tempmin = (this.forecast[0] && this.forecast[0].tempmin) ? this.forecast[0].tempmin : '-';
      return {
        type: DataType.FORECAST,
        values: [0],
        items: [
          { label: 'Temperatuur', tooltip: '', value: tempmin + ' °C / ' + tempmax + ' °C' },
          { label: 'Windsnelheid', tooltip: '', value: windspeed + ' km/uur' },
          { label: 'Regen', tooltip: '', value: rain + ' mm' },
          { label: 'Luchtdruk', tooltip: '', value: pressure + ' mb' },
        ]
      };
  }

}
