import { Request, Response } from 'express'
import { BandBusiness } from '../business/BandBusiness'
import { BandInputDTO, BandOutputDTO } from '../model/Band'

export class BandController {
    constructor(
        private bandBusiness: BandBusiness
    ) { }

    async create(req: Request, res: Response) {
        try {
            let message = "Success!"
            const { name, musicGenre, responsible } = req.body

            const input: BandInputDTO = {
                name,
                musicGenre,
                responsible
            }

            const token = req.headers.authorization

            await this.bandBusiness.create(input, token)

            res.status(201).send({ message })

        } catch (error) {
            let message = error.sqlMessage || error.message
            res.status(error.code || 400).send({ message })
        }
    }

    async findById(req: Request, res: Response) {
        try {
            let message = "Success!"

            const id = req.params.id

            const token = req.headers.authorization

            const band: BandOutputDTO = await this.bandBusiness.findById(id, token)

            res.status(201).send({ message, band })

        } catch (error) {
            let message = error.sqlMessage || error.message
            res.status(error.code || 400).send({ message })
        }
    }

}