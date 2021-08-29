import express from 'express'
import { BandBusiness } from '../business/BandBusiness'
import { BandController } from '../controller/BandController'
import { BandDatabase } from '../data/BandDatabase'
import { Authenticator } from '../services/Authenticator'
import { IdGenerator } from '../services/IdGenerator'


export const bandRouter = express.Router()

const authenticator = new Authenticator()
const idGenerator = new IdGenerator()

const bandDatabase = new BandDatabase()
const bandBusiness = new BandBusiness(authenticator, idGenerator, bandDatabase)
const bandController = new BandController(bandBusiness)

bandRouter.get("/:id", (req, res) => bandController.findById(req, res))

bandRouter.post("/create", (req, res) => bandController.create(req, res))