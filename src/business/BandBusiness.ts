import { BandDatabase } from "../data/BandDatabase";
import { Band } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const bandDatabase = new BandDatabase()

const authenticator = new Authenticator()

export class BandBusiness {

    async create(name: string, musicGenre: string, responsible: string, token?: string) {
        if (!name || !musicGenre || !responsible) {
            throw new Error("'name', 'musicGenre' and 'responsible' must be provided")
        }

        if (!token) {
            throw new Error("Authentication required")
        }

        const tokenData = authenticator.getTokenData(token)

        if (tokenData.role !== "ADMIN") {
            throw new Error("You should be an ADMIN user to access")
        }

        const idGenerator = new IdGenerator()
        const id: string = idGenerator.generate()


        const newBand = new Band(id, name, musicGenre, responsible)


        await bandDatabase.create(newBand)

    }

    async findById(id: string, token?: string) {
        if (!id) {
            throw new Error("'id' must be provided")
        }

        if (!token) {
            throw new Error("Authentication required")
        }

        authenticator.getTokenData(token)

        const band = await bandDatabase.findById(id)

        if(!band){
            throw new Error("Band doesn't exist")
        }

        return band


    }

}