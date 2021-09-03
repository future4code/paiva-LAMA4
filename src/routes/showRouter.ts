import express from 'express'
import { ShowBusiness } from '../business/ShowBusiness'
import { ShowController } from '../controller/ShowController'
import { ShowDatabase } from '../data/ShowDatabase'
import { Authenticator } from '../services/Authenticator'
import { IdGenerator } from '../services/IdGenerator'


export const showRouter = express.Router()

const authenticator = new Authenticator()
const idGenerator = new IdGenerator()

const showDatabase = new ShowDatabase()
const showBusiness = new ShowBusiness(authenticator, idGenerator, showDatabase)
const showController = new ShowController(showBusiness)

showRouter.get("/:weekDay", (req, res) => showController.findByDay(req, res))

showRouter.post("/create", (req, res) => showController.create(req, res))