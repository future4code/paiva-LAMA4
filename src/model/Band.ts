export interface BandInputDTO {
    name: string | undefined,
    musicGenre: string | undefined,
    responsible: string | undefined,
}

export interface BandOutputDTO {
    id: string,
    name: string,
    musicGenre: string,
    responsible: string,
}

export class Band {
    constructor(
        private id: string,
        private name: string,
        private musicGenre: string,
        private responsible: string,
    ) { }

    getId(): string {
        return this.id;
    };

    getName(): string {
        return this.name;
    };

    getMusicGenre(): string {
        return this.musicGenre;
    };

    getResponsible(): string {
        return this.responsible;
    };

    setId(newId: string): void {
        this.id = newId;
    };

    setName(newName: string): void {
        this.name = newName;
    };

    setMusicGenre(newMusicGenre: string): void {
        this.musicGenre = newMusicGenre;
    };

    setPassword(newResponsible: string): void {
        this.responsible = newResponsible;
    };

    static toBandModel(data: any): Band {
        return new Band(data.id, data.name, data.musicGenre, data.responsible);
    };
};