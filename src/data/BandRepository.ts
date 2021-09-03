import { Band } from "../model/Band";


export interface BandRepository {
    create(newBand: Band): Promise<void>,
    findById(id: string): Promise<Band | undefined>
}