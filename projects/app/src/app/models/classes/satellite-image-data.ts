export class SatelliteImageData {
    id: number = null;
    datetime: Date = null;
    url: string = '';

    fromMockData(): SatelliteImageData {
        return this;
    }
}