import { Request, Response } from 'express'
import { BandBusiness } from '../business/BandBusiness'

const bandBusiness: BandBusiness = new BandBusiness()

export class BandController {
    async create(req: Request, res: Response) {
        try {
            let message = "Success!"
            const { name, musicGenre, responsible } = req.body

            const token = req.headers.authorization

            await bandBusiness.create(name, musicGenre, responsible, token)

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

            const band = await bandBusiness.findById(id, token)

            res.status(201).send({ message, band })

        } catch (error) {
            let message = error.sqlMessage || error.message
            res.status(error.code || 400).send({ message })
        }
    }

}