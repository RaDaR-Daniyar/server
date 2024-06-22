import WaterModel from '../models/Water.js'
import AppError from '../errors/AppError.js'

class Water {
    async getAll(req, res, next) {
        try {
            const waters = await WaterModel.getAll()
            res.json(waters)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id водонепроницаемости')
            }
            const water = await WaterModel.getOne(req.params.id)
            res.json(water)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия водонепроницаемости')
            }
            const water = await WaterModel.create(req.body)
            res.json(water)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id водонепроницаемости')
            }
            if (!req.body.name) {
                throw new Error('Нет названия водонепроницаемости')
            }
            const water = await WaterModel.update(req.params.id, req.body)
            res.json(water)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id водонепроницаемости')
            }
            const water = await WaterModel.delete(req.params.id)
            res.json(water)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Water()