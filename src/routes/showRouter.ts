import express from 'express'
import { ShowBusiness } from '../business/ShowBusiness'
import { ShowController } from '../controller/ShowController'
import { ShowDatabase } from '../data/ShowDatabase'


export const showRouter = express.Router()
const showDatabase = new ShowDatabase()
const showBusiness = new ShowBusiness(showDatabase)
const showController = new ShowController(showBusiness)

showRouter.get("/:weekDay", (req, res) => showController.findByDay(req, res))

showRouter.post("/create", (req, res) => showController.create(req, res))