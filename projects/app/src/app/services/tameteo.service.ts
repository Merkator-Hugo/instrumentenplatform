import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TameteoService {

  private URL = 'http://api.tameteo.nl/index.php?api_lang=nl';
  private VINKEL = '187354';
  private SCHAIJK = '187410';
  private APIKEY = 'rz98ra87zxjx';

  public forecastChanged: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getData7() {
    return this.http.get(this.URL + '&localidad=' + this.VINKEL + '&affiliate_id=' + this.APIKEY)
      .subscribe((data) => {
        console.log(data);
      })
  }

  getData() {
    this.http.get('http://hugozalm.nl/api/tameteo/uur/' + this.VINKEL)
      .subscribe((data) => {
        console.log(data);
        let forecast = [];
        Object.entries(data['day']).forEach((day) => {
            forecast.push({
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
        this.forecastChanged.emit(forecast);
      })
  }

}
