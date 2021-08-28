import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { LoginInputDTO, UserInputDTO } from '../model/User'

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    async signup(req: Request, res: Response) {
        try {
            let message = "Success!"
            const { name, email, password, role } = req.body

            const input: UserInputDTO = {
                name,
                email,
                password,
                role
            }

            const token = await this.userBusiness.signup(input)

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

            const input: LoginInputDTO = {
                email,
                password
            }

            const token = await this.userBusiness.login(input)

            res.status(200).send({ message, token })

        } catch (error) {
            let message = error.sqlMessage || error.message
            res.status(error.code || 400).send({ message })
        }
    }
}