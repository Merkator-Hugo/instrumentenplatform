export class MeteorData {
    id: number = null;
    datetime: Date = null;
    meteorcount: number = null;

    fromMockData(): MeteorData {
        return this;
    }
}