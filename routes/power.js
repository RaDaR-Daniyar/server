import express from 'express'
import PowerController from '../controllers/Power.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', PowerController.getAll)
router.get('/getone/:id([0-9]+)', PowerController.getOne)
router.post('/create', PowerController.create)
router.put('/update/:id([0-9]+)', PowerController.update)
router.delete('/delete/:id([0-9]+)', PowerController.delete)

export default router