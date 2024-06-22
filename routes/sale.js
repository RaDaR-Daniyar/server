import express from 'express'
import SaleController from '../controllers/Sale.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', SaleController.getAll)
router.get('/getone/:id([0-9]+)', SaleController.getOne)
router.post('/create', SaleController.create)
router.put('/update/:id([0-9]+)', SaleController.update)
router.delete('/delete/:id([0-9]+)', SaleController.delete)

export default router