import { Band } from "../../../src/model/Band";
import { bandMock } from "./BandMock";

export class BandDatabaseMock {
    public async create(newBand: Band): Promise<void> {

    }

    public async findById(id: string): Promise<Band | undefined> {

        switch (id) {
            case "id_mock":
                return bandMock
            default:
                return undefined
        }
    }

}