import { AirData } from './air-data';
import { AllskyCameraData } from './allsky-camera-data';
import { MagnetometerData } from './magnetometer-data';
import { MeteorData } from './meteor-data';
import { PrecipitationData } from './precipitation-data';
import { SatelliteImageData } from './satellite-image-data';
import { SunData } from './sun-data';
import { TemperatureData } from './temperature-data';
import { WeatherForcastData } from './weather-forcast-data';

export class WeatherData {
    air: AirData;
    camera: AllskyCameraData;
    magnetometer: MagnetometerData;
    meteor: MeteorData;
    precipitation: PrecipitationData;
    satellite: SatelliteImageData;
    sun: SunData;
    temperature: TemperatureData;
    weatherforcast: WeatherForcastData;

    constructor() {
        this.air = new AirData();
        this.camera = new AllskyCameraData();
        this.magnetometer = new MagnetometerData();
        this.meteor = new MeteorData();
        this.precipitation = new PrecipitationData();
        this.satellite = new SatelliteImageData();
        this.sun = new SunData();
        this.temperature = new TemperatureData();
        this.weatherforcast = new WeatherForcastData();
    }

    fromMockData(air: AirData, precipitation: PrecipitationData, sun: SunData, temperature: TemperatureData) {
        this.air = air;
        this.precipitation = precipitation;
        this.sun = sun;
        this.temperature = temperature;
        return this;
    }
}