import express from 'express'
import ShapeController from '../controllers/Shape.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', ShapeController.getAll)
router.get('/getone/:id([0-9]+)', ShapeController.getOne)
router.post('/create', ShapeController.create)
router.put('/update/:id([0-9]+)', ShapeController.update)
router.delete('/delete/:id([0-9]+)', ShapeController.delete)

export default router