import GlassModel from '../models/Glass.js'
import AppError from '../errors/AppError.js'

class Glass {
    async getAll(req, res, next) {
        try {
            const glasses = await GlassModel.getAll()
            res.json(glasses)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id типа стекла')
            }
            const glass = await GlassModel.getOne(req.params.id)
            res.json(glass)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия типа стекла')
            }
            const glass = await GlassModel.create(req.body)
            res.json(glass)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id типа стекла')
            }
            if (!req.body.name) {
                throw new Error('Нет названия типа стекла')
            }
            const glass = await GlassModel.update(req.params.id, req.body)
            res.json(glass)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id типа стекла')
            }
            const glass = await GlassModel.delete(req.params.id)
            res.json(glass)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Glass()