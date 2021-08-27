export enum SHOW_DAYS {
    FRIDAY = "FRIDAY", 
    SATURDAY = "SATURDAY", 
    SUNDAY = "SUNDAY"
}

export class Show {
    constructor(
        private id: string,
        private weekDay: SHOW_DAYS,
        private startTime: number,
        private endTime: number,
        private bandId: string
    ) { }

    getId(): string {
        return this.id;
    };

    getWeekDay(): SHOW_DAYS {
        return this.weekDay;
    };

    getStartTime(): number {
        return this.startTime;
    };

    getEndTime(): number {
        return this.endTime;
    };

    getBandId(): string {
        return this.bandId;
    };

    setId(newId: string): void {
        this.id = newId;
    };

    setWeekDay(newWeekDay: SHOW_DAYS): void {
        this.weekDay = newWeekDay;
    };

    setStartTime(newStartTime: number): void {
        this.startTime = newStartTime;
    };

    setEndTime(newEndTime: number): void {
        this.endTime = newEndTime;
    };

    setBandId(newBandId: string): void {
        this.bandId = newBandId;
    };

    static toShowModel(data: any): Show {
        return new Show(data.id, data.week_day, data.start_time, data.end_time, data.band_id);
    };
};