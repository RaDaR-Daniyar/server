import express from 'express'
import GlassController from '../controllers/Glass.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', GlassController.getAll)
router.get('/getone/:id([0-9]+)', GlassController.getOne)
router.post('/create', GlassController.create)
router.put('/update/:id([0-9]+)', GlassController.update)
router.delete('/delete/:id([0-9]+)', GlassController.delete)

export default router