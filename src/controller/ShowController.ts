import { Request, Response } from 'express'
import { ShowBusiness } from '../business/ShowBusiness'
import { ShowInfoOutputDTO, ShowInputDTO, SHOW_DAYS } from '../model/Show'

export class ShowController {
    constructor(
        private showBusiness: ShowBusiness
    ) { }

    async create(req: Request, res: Response):Promise<void> {
        try {
            let message = "Success!"
            const { weekDay, startTime, endTime, bandId } = req.body

            const input: ShowInputDTO = {
                weekDay,
                startTime,
                endTime,
                bandId
            }

            const token = req.headers.authorization

            await this.showBusiness.create(input, token)

            res.status(201).send({ message })

        } catch (error) {
            let message = error.sqlMessage || error.message
            res.status(error.code || 400).send({ message })
        }
    }

    async findByDay(req: Request, res: Response) {
        try {
            let message = "Success!"

            const weekDay = req.params.weekDay as SHOW_DAYS

            const token = req.headers.authorization

            const shows: ShowInfoOutputDTO[] = await this.showBusiness.findByDay(weekDay, token)

            res.status(200).send({ message, shows })

        } catch (error) {
            let message = error.sqlMessage || error.message
            res.status(error.code || 400).send({ message })
        }
    }

}