import StrapModel from '../models/Strap.js'
import AppError from '../errors/AppError.js'

class Strap {
    async getAll(req, res, next) {
        try {
            const straps = await StrapModel.getAll()
            res.json(straps)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id материала ремешка')
            }
            const strap = await StrapModel.getOne(req.params.id)
            res.json(strap)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия материала ремешка')
            }
            const strap = await StrapModel.create(req.body)
            res.json(strap)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id материала ремешка')
            }
            if (!req.body.name) {
                throw new Error('Нет названия материала ремешка')
            }
            const strap = await StrapModel.update(req.params.id, req.body)
            res.json(strap)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id материала ремешка')
            }
            const strap = await StrapModel.delete(req.params.id)
            res.json(strap)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Strap()