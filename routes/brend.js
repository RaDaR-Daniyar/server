import express from 'express'
import BrendController from '../controllers/Brend.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', BrendController.getAll)
router.get('/getone/:id([0-9]+)', BrendController.getOne)
router.post('/create', BrendController.create)
router.put('/update/:id([0-9]+)', BrendController.update)
router.delete('/delete/:id([0-9]+)', BrendController.delete)

export default router