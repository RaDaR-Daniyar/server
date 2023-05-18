import express from 'express'
import MaterialController from '../controllers/Material.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', MaterialController.getAll)
router.get('/getone/:id([0-9]+)', MaterialController.getOne)
router.post('/create', MaterialController.create)
router.put('/update/:id([0-9]+)', MaterialController.update)
router.delete('/delete/:id([0-9]+)', MaterialController.delete)

export default router