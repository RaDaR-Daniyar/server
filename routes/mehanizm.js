import express from 'express'
import MehanizmController from '../controllers/Mehanizm.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', MehanizmController.getAll)
router.get('/getone/:id([0-9]+)', MehanizmController.getOne)
router.post('/create', MehanizmController.create)
router.put('/update/:id([0-9]+)', MehanizmController.update)
router.delete('/delete/:id([0-9]+)', MehanizmController.delete)

export default router