export enum SHOW_DAYS {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export interface ShowInputDTO {
    weekDay: string | undefined,
    startTime: number | undefined,
    endTime: number | undefined,
    bandId: string | undefined
}

export interface ShowInfoOutputDTO {
    name: string,
    musicGenre: string,
    schedule: string
}

export class SimplifiedShow {
    constructor(
        private name: string,
        private musicGenre: string,
        private startTime: number,
        private endTime: number
    ) { }

    getName(): string {
        return this.name;
    };

    getMusicGenre(): string {
        return this.musicGenre;
    };

    getStartTime(): number {
        return this.startTime;
    };

    getEndTime(): number {
        return this.endTime;
    };

    static toSimplifiedModel(data: any): SimplifiedShow {
        return new SimplifiedShow(data.name, data.music_genre, data.start_time, data.end_time);
    };
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