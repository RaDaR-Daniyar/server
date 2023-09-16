import express from 'express'
import CatalogController from '../controllers/Admin.js'
import ProductPropController from '../controllers/ProductProp.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', CatalogController.getAll)
router.get('/getrandom', CatalogController.getRandom)
router.get('/getone/:id([0-9]+)', CatalogController.getOne)
router.post('/create', CatalogController.create)
router.put('/update/:id([0-9]+)', CatalogController.update)
router.delete('/delete/:id([0-9]+)', CatalogController.delete)

router.get('/:productId([0-9]+)/property/getall', ProductPropController.getAll)
router.get('/:productId([0-9]+)/property/getone/:id([0-9]+)', ProductPropController.getOne)
router.post('/:productId([0-9]+)/property/create', authMiddleware, adminMiddleware, ProductPropController.create)
router.put('/:productId([0-9]+)/property/update/:id([0-9]+)', authMiddleware, adminMiddleware, ProductPropController.update)
router.delete('/:productId([0-9]+)/property/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ProductPropController.delete)

export default router