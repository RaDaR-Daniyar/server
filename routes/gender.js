import express from 'express'
import GenderController from '../controllers/Gender.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', GenderController.getAll)
router.get('/getone/:id([0-9]+)', GenderController.getOne)
router.post('/create', GenderController.create)
router.put('/update/:id([0-9]+)', GenderController.update)
router.delete('/delete/:id([0-9]+)', GenderController.delete)

export default router