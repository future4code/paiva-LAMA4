import { BandDatabase } from "../data/BandDatabase";
import { CustomError } from "../error/CustomError";
import { Band } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const bandDatabase = new BandDatabase()

const authenticator = new Authenticator()

export class BandBusiness {

    async create(name: string, musicGenre: string, responsible: string, token?: string) {
        if (!token) {
            throw new CustomError(401, "Authentication required")
        }

        const tokenData = authenticator.getTokenData(token)

        if (tokenData.role !== "ADMIN") {
            throw new CustomError(403, "You should be an ADMIN user to access")
        }

        if (!name || !musicGenre || !responsible) {
            throw new CustomError(422, "'name', 'musicGenre' and 'responsible' must be provided")
        }

        const idGenerator = new IdGenerator()
        const id: string = idGenerator.generate()


        const newBand = new Band(id, name, musicGenre, responsible)


        await bandDatabase.create(newBand)

    }

    async findById(id: string, token?: string) {
        if (!id) {
            throw new CustomError(422, "'id' must be provided")
        }

        if (!token) {
            throw new CustomError(401, "Authentication required")
        }

        authenticator.getTokenData(token)

        const band = await bandDatabase.findById(id)

        if (!band) {
            throw new CustomError(404, "Band doesn't exist")
        }

        return band


    }

}