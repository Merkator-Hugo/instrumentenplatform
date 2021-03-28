export class MagnetometerData {
    id: number = null;
    datetime: Date = null;
    x: number = null;
    y: number = null;
    z: number = null;
    total: number = null;
    sqm: number = null;

    fromMockData(): MagnetometerData {
        return this;
    }
}