import express from 'express'
import { BandBusiness } from '../business/BandBusiness'
import { BandController } from '../controller/BandController'
import { BandDatabase } from '../data/BandDatabase'


export const bandRouter = express.Router()
const bandDatabase = new BandDatabase()
const bandBusiness = new BandBusiness(bandDatabase)
const bandController = new BandController(bandBusiness)

bandRouter.get("/:id", (req, res) => bandController.findById(req, res))

bandRouter.post("/create", (req, res) => bandController.create(req, res))