import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'

const userBusiness: UserBusiness = new UserBusiness()

export class UserController {
    async signup(req: Request, res: Response) {
        try {
            let message = "Success!"
            const { name, email, password, role } = req.body


            const token = await userBusiness.signup(name, email, password, role)

            res.status(201).send({ message, token })

        } catch (error) {
            let message = error.sqlMessage || error.message
            res.status(error.code || 400).send({ message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            let message = "Success!"

            const { email, password } = req.body

            const token = await userBusiness.login(email, password)

            res.status(200).send({ message, token })

        } catch (error) {
            let message = error.sqlMessage || error.message
            res.status(error.code || 400).send({ message })
        }
    }
}