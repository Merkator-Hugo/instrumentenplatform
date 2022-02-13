import { EventEmitter, Injectable } from '@angular/core';
import { DataEventinfo, WeatherData } from '../../models/classes';
import { DataType } from '../../models/enums';
import { AstronomyService, DataService, CalculationService, TameteoService } from '../../services/services';
import { UnitsConverorService } from 'ngx-units-converter';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public widgetdataChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private data: DataService,
    private calculation: CalculationService,
    private conversion: UnitsConverorService,
    private astronomy: AstronomyService,
    private tameteo: TameteoService) {
      this.initWidgets();
      this.data.currentDataChanged.subscribe((wd: DataEventinfo) => {
        this.updateWidgets(wd.data);
      });
  }

  private initWidgets() {
    let widgetInfos = [];
    widgetInfos.push({
      type: DataType.TIME,
      values: [0],
      items: [
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' }
      ]
    });
    widgetInfos.push({
      type: DataType.TEMPERATURE,
      values: [0],
      items: [
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' }
      ]
    });
    widgetInfos.push({
      type: DataType.WIND,
      values: [0],
      items: [
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' }
      ]
    });
    widgetInfos.push({
      type: DataType.AIR,
      values: [0],
      items: [
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' }
      ]
    });
    widgetInfos.push({
      type: DataType.PRECIPITATION,
      values: [0],
      items: [
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' }
      ]
    });
    widgetInfos.push(this.tameteo.getForecast());
    widgetInfos.push(this.astronomy.getMoonData());
    widgetInfos.push(this.astronomy.getSunData());
    this.widgetdataChanged.emit(widgetInfos);
  }

  private updateWidgets(wd: WeatherData) {
    let widgetInfos = [];
    widgetInfos.push({
      type: DataType.TIME,
      values: [this.astronomy.getNow()],
      items: [
        { label: '', tooltip: '', value: this.astronomy.getDate(), unit: '' },
        { label: '', tooltip: '', value: this.astronomy.getTime(), unit: '' },
        { label: 'JD', tooltip: 'Julaanse Dag', value: this.astronomy.getJulianDate(2), unit: '' },
        { label: 'GAST', tooltip: 'Greenwich Apparant Sidereal Time', value: this.astronomy.getSideralTime(2), unit: '' }
      ]
    });
    const temp1 = (wd.temperature.temperature != null) ? wd.temperature.temperature : '-';
    const temp2 = (wd.temperature.inside != null) ? wd.temperature.inside : '-';
    const temp3 = (wd.temperature.feeling != null) ? wd.temperature.feeling : '-';
    const temp4 = (wd.temperature.dewpoint != null) ? wd.temperature.dewpoint : '-';
    widgetInfos.push({
      type: DataType.TEMPERATURE,
      values: [temp1],
      items: [
        { label: '', tooltip: '', value: temp1, unit: ' °C' },
        { label: 'Binnen', tooltip: 'Binnentemperatuur', value: temp2, unit: ' °C' },
        { label: 'Gevoel', tooltip: 'Gevoelstemperatuur', value: temp3, unit: ' °C' },
        { label: 'Dauwpunt', tooltip: 'Dauwpunt', value: temp4, unit: ' °C' }
      ]
    });
    const windspeed = (wd.air.wind_speed != null) ? wd.air.wind_speed : '-';
    const winddir = (wd.air.wind_direction != null) ? wd.air.wind_direction : '-';
    const streken = ['N','NNO','NO','ONO','O','OZO','ZO','ZZO','Z','ZZW','ZW','WZW','W','WNW','NW','NNW','N']
    const streek = (wd.air.wind_direction != null) ? streken[Math.floor((wd.air.wind_direction + 11.25) / 22.5)] : '-';
    const beaufort = this.calculation.toBeaufort(this.conversion.init(0).from('m/s').to('km/h').round(3));
    const direction = (wd.air.wind_direction != null) ? wd.air.wind_direction : 0;
    widgetInfos.push({
      type: DataType.WIND,
      values: [direction, beaufort.value],
      items: [
        { label: '', tooltip: '', value: streek + ' ' + beaufort.value.toString(), unit: '' },
        { label: 'Naam', tooltip: 'Windkracht (beaufort)', value: beaufort.name, unit: '' },
        { label: 'Richting', tooltip: 'Windrichting', value: winddir, unit: ' °' },
        { label: 'Snelheid', tooltip: 'Windsnelheid', value: windspeed, unit: ' m/s' }
      ]
    });
    const pressure = (wd.air.airpressure != null) ? wd.air.airpressure : '-';
    const humidity = (wd.air.humidity != null) ? wd.air.humidity : '-';
    const cloud = (wd.air.cloud_coverage_height != null) ? wd.air.cloud_coverage_height : '-';
    const particulate = (wd.air.particulate_matter != null) ? wd.air.particulate_matter : '-';
    widgetInfos.push({
      type: DataType.AIR,
      values: [pressure],
      items: [
        { label: 'luchtdruk', tooltip: '', value: pressure, unit: ' hPa'},
        { label: 'luchtvochtigheid', tooltip: '', value: humidity, unit: ' %' },
        { label: 'hoogte wolkendek', tooltip: '', value: cloud, unit: ' m' },
        { label: 'luchtvervuiling', tooltip: '', value: particulate, unit: ' %'}
      ]
    });
    const neerslag = (wd.precipitation.value != null) ? wd.precipitation.value : '-';
    widgetInfos.push({
      type: DataType.PRECIPITATION,
      values: [neerslag],
      items: [
        { label: '', tooltip: '', value: neerslag, unit: ' mm/u' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: 'Hoeveelheid', tooltip: 'Hoeveelheid neerslag in laatste uur', value: neerslag, unit: ' mm/u' }
      ]
    });
    const url = (wd.camera.url != null) ? wd.camera.url : '';
    const datetime = (wd.camera.datetime != null) ? wd.camera.datetime : wd.datetime;
    widgetInfos.push({
      type: DataType.CAMERA,
      values: [url, datetime],
      items: [
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' },
        { label: '', tooltip: '', value: '-', unit: '' }
      ]
    });    
    widgetInfos.push(this.tameteo.getForecast());
    widgetInfos.push(this.astronomy.getMoonData());
    let sun = this.astronomy.getSunData();
    const value = (wd.sun.value != null) ? wd.sun.value : 0;
    sun.values = [value];
    sun.items[0] = { label: 'helderheid', tooltip: '', value: value.toString(), unit: '' };
    widgetInfos.push(sun);
    this.widgetdataChanged.emit(widgetInfos);
  }



}
