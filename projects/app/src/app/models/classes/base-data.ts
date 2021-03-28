export class BaseData {
    id: number = null;
    datetime: Date = null;
    
    getDate(YYYYMMDD: string, HH: string) {
        return new Date(
            Number(YYYYMMDD.substr(0,4)),
            Number(YYYYMMDD.substr(4,2)),
            Number(YYYYMMDD.substr(6,4)),
            Number(HH),
            0,
            0
        )
    }
}