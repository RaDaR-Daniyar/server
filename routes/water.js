import express from 'express'
import WaterController from '../controllers/Water.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', WaterController.getAll)
router.get('/getone/:id([0-9]+)', WaterController.getOne)
router.post('/create', WaterController.create)
router.put('/update/:id([0-9]+)', WaterController.update)
router.delete('/delete/:id([0-9]+)', WaterController.delete)

export default router