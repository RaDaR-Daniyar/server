import PowerModel from '../models/Power.js'
import AppError from '../errors/AppError.js'

class Power {
    async getAll(req, res, next) {
        try {
            const powers = await PowerModel.getAll()
            res.json(powers)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id бренда')
            }
            const power = await PowerModel.getOne(req.params.id)
            res.json(power)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия бренда')
            }
            const power = await PowerModel.create(req.body)
            res.json(power)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id бренда')
            }
            if (!req.body.name) {
                throw new Error('Нет названия бренда')
            }
            const power = await PowerModel.update(req.params.id, req.body)
            res.json(power)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id бренда')
            }
            const power = await PowerModel.delete(req.params.id)
            res.json(power)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Power()