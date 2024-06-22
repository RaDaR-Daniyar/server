import express from 'express'
import StrapController from '../controllers/Strap.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', StrapController.getAll)
router.get('/getone/:id([0-9]+)', StrapController.getOne)
router.post('/create', StrapController.create)
router.put('/update/:id([0-9]+)', StrapController.update)
router.delete('/delete/:id([0-9]+)', StrapController.delete)

export default router