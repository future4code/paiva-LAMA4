import express from 'express'
import { ShowController } from '../controller/ShowController'


export const showRouter = express.Router()
const showController = new ShowController()

showRouter.get("/:weekDay", showController.findByDay)

showRouter.post("/create", showController.create)