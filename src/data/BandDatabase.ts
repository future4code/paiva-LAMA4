import { CustomError } from "../error/CustomError";
import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    private static TABLE_NAME = "Lama_Bands"

    async create(newBand: Band) {
        try {
            await BaseDatabase.connection(BandDatabase.TABLE_NAME)
                .insert({
                    id: newBand.getId(),
                    name: newBand.getName(),
                    music_genre: newBand.getMusicGenre(),
                    responsible: newBand.getResponsible(),
                })
        } catch (error) {
            throw new CustomError(400, error.sqlMessage)
        }

    }

    public async findById(id: string): Promise<Band | undefined> {

        const band = await BaseDatabase.connection(BandDatabase.TABLE_NAME)
            .select('*')
            .where({ id: id })
        return band[0] && Band.toBandModel(band[0]);
    }


}