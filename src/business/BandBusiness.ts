import { BandDatabase } from "../data/BandDatabase";
import { CustomError } from "../error/CustomError";
import { Band, BandInputDTO, BandOutputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export class BandBusiness {
    constructor(
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private bandDatabase: BandDatabase
    ) { }

    async create(input: BandInputDTO, token?: string) {
        const { name, musicGenre, responsible } = input

        if (!token) {
            throw new CustomError(401, "Authentication required")
        }

        const tokenData = this.authenticator.getTokenData(token)

        if (tokenData.role !== "ADMIN") {
            throw new CustomError(403, "You should be an ADMIN user to access")
        }

        if (!name || !musicGenre || !responsible) {
            throw new CustomError(422, "'name', 'musicGenre' and 'responsible' must be provided")
        }

        const id: string = this.idGenerator.generate()


        const newBand = new Band(id, name, musicGenre, responsible)


        await this.bandDatabase.create(newBand)

    }

    async findById(id: string, token?: string) {
        if (!id) {
            throw new CustomError(422, "'id' must be provided")
        }

        if (!token) {
            throw new CustomError(401, "Authentication required")
        }

        this.authenticator.getTokenData(token)

        const band = await this.bandDatabase.findById(id)

        if (!band) {
            throw new CustomError(404, "Band doesn't exist")
        }

        const bandOutput: BandOutputDTO = {
            id: band.getId(),
            name: band.getName(),
            musicGenre: band.getMusicGenre(),
            responsible: band.getResponsible()
        }

        return bandOutput


    }

}