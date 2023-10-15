import SaleModel from '../models/sale.js'
import AppError from '../errors/AppError.js'

class Sale {
    async getAll(req, res, next) {
        try {
            const mehanizms = await SaleModel.getAll()
            res.json(mehanizms)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указана скидка')
            }
            const mehanizm = await SaleModel.getOne(req.params.id)
            res.json(mehanizm)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {

            if (!req.body.name || !req.body.id) {
                throw new Error('Нет указана скидка')
            }
            const mehanizm = await SaleModel.create(req.body)
            res.json(mehanizm)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указана скидка')
            }
            if (!req.body.name) {
                throw new Error('Не указана скидка')
            }
            const mehanizm = await SaleModel.update(req.params.id, req.body)
            res.json(mehanizm)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указана скидка')
            }
            const mehanizm = await SaleModel.delete(req.params.id)
            res.json(mehanizm)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Sale()