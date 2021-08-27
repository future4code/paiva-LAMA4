import { Request, Response } from 'express'
import { ShowBusiness } from '../business/ShowBusiness'
import { SHOW_DAYS } from '../model/Show'

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

    async findByDay(req: Request, res: Response) {
        try {
            let message = "Success!"

            const weekDay = req.params.weekDay as SHOW_DAYS

            const token = req.headers.authorization

            const shows = await showBusiness.findByDay(weekDay, token)

            res.status(200).send({ message, shows })

        } catch (error) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message

            res.send({ message })
        }
    }

}