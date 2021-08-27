import { Request, Response } from 'express'
import { ShowBusiness } from '../business/ShowBusiness'

const showBusiness: ShowBusiness = new ShowBusiness()

export class ShowController {
    async create(req: Request, res: Response) {
        try {
            let message = "Success!"
            const { weekDay, startTime, endTime, bandId } = req.body

            const token = req.headers.authorization

            await showBusiness.create(weekDay, startTime, endTime, bandId, token)

            res.status(201).send({ message })

        } catch (error) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message

            res.send({ message })
        }
    }

    // async findById(req: Request, res: Response) {
    //     try {
    //         let message = "Success!"

    //         const id = req.params.id

    //         const token = req.headers.authorization

    //         const band = await bandBusiness.findById(id, token)

    //         res.status(201).send({ message, band })

    //     } catch (error) {
    //         res.statusCode = 400
    //         let message = error.sqlMessage || error.message

    //         res.send({ message })
    //     }
    // }

}