import { EventEmitter, Injectable } from '@angular/core';
import { WeatherData } from '../../models/classes';
import { DataType } from '../../models/enums';
import { DataService } from '../../services/services';

@Injectable({
  providedIn: 'root'
})
export class Dashboard3Service {

  public widgetdataChanged: EventEmitter<any> = new EventEmitter();

    constructor(private data: DataService) {
      let widgetInfos = [];
      widgetInfos.push( { 
        type: DataType.TIME,
        value: 0, 
        items: [ 
          { label: '', tooltip: '', value: '-' },
          { label: '', tooltip: '', value: '-' },
          { label: '', tooltip: '', value: '-' }, 
          { label: '', tooltip: '', value: '-' }
        ]
      });
      widgetInfos.push( { 
        type: DataType.TEMPERATURE,
        value: 0, 
        items: [ 
          { label: '', tooltip: '', value: '- °C' }, 
          { label: '', tooltip: '', value: '- °C' }, 
          { label: '', tooltip: '', value: '- °C' }, 
          { label: '', tooltip: '', value: '- °C' } 
        ]
      });
      this.widgetdataChanged.emit(widgetInfos);
      this.data.currentDataChanged.subscribe((wd: WeatherData) => {
        this.widgetdataChanged.emit(widgetInfos);
      })
    }

}
