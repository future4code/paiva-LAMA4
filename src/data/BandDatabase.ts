import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    private static TABLE_NAME = "Lama_Bands"

    async create(newBand: Band) {
        await BaseDatabase.connection(BandDatabase.TABLE_NAME)
            .insert({
                id: newBand.getId(),
                name: newBand.getName(),
                music_genre: newBand.getMusicGenre(),
                responsible: newBand.getResponsible(),
            })
    }

    public async findById(id: string): Promise<Band | undefined> {

        const band = await BaseDatabase.connection(BandDatabase.TABLE_NAME)
            .select('*')
            .where({ id: id })
        return band[0] && Band.toBandModel(band[0]);
    }
    
}