import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'

export class UserController {
    async signup(req: Request, res: Response) {
        try {
            let message = "Success!"
            const { name, email, password, role } = req.body

            const userBusiness: UserBusiness = new UserBusiness()
            const token = await userBusiness.signup(name, email, password, role)

            res.status(201).send({ message, token })

        } catch (error) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message

            res.send({ message })
        }
    }
}