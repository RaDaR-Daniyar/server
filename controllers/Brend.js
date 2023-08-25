import BrendModel from '../models/Brend.js'
import AppError from '../errors/AppError.js'

class Brend {
    async getAll(req, res, next) {
        try {
            const brends = await BrendModel.getAll()
            res.json(brends)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id бренда')
            }
            const brend = await BrendModel.getOne(req.params.id)
            res.json(brend)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия бренда')
            }
            const brend = await BrendModel.create(req.body)
            res.json(brend)
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
            const brend = await BrendModel.update(req.params.id, req.body)
            res.json(brend)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id бренда')
            }
            const brend = await BrendModel.delete(req.params.id)
            res.json(brend)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Brend()