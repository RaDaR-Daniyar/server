import MehanizmModel from '../models/Mehanizm.js'
import AppError from '../errors/AppError.js'

class Mehanizm {
    async getAll(req, res, next) {
        try {
            const mehanizms = await MehanizmModel.getAll()
            res.json(mehanizms)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id бренда')
            }
            const mehanizm = await MehanizmModel.getOne(req.params.id)
            res.json(mehanizm)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия бренда')
            }
            const mehanizm = await MehanizmModel.create(req.body)
            res.json(mehanizm)
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
            const mehanizm = await MehanizmModel.update(req.params.id, req.body)
            res.json(mehanizm)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id бренда')
            }
            const mehanizm = await MehanizmModel.delete(req.params.id)
            res.json(mehanizm)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Mehanizm()