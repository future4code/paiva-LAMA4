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
            res.statusCode = 400
            let message = error.sqlMessage || error.message

            res.send({ message })
        }
    }

    // async login(req: Request, res: Response) {
    //     try {
    //         let message = "Success!"

    //         const { email, password } = req.body

    //         const token = await userBusiness.login(email, password)

    //         res.status(200).send({ message, token })

    //     } catch (error) {
    //         let message = error.sqlMessage || error.message
    //         res.statusCode = 400

    //         res.send({ message })
    //     }
    // }
}