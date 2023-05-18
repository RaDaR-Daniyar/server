import express from 'express'
import BrandController from '../controllers/Brand.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', BrandController.getAll)
router.get('/getone/:id([0-9]+)', BrandController.getOne)
router.post('/create', BrandController.create)
router.put('/update/:id([0-9]+)', BrandController.update)
router.delete('/delete/:id([0-9]+)', BrandController.delete)

export default router