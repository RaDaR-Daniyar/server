import GenderModel from '../models/Gender.js'
import AppError from '../errors/AppError.js'

class Gender {
    async getAll(req, res, next) {
        try {
            const genders = await GenderModel.getAll()
            res.json(genders)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пола')
            }
            const gender = await GenderModel.getOne(req.params.id)
            res.json(gender)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия пола')
            }
            const gender = await GenderModel.create(req.body)
            res.json(gender)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пола')
            }
            if (!req.body.name) {
                throw new Error('Нет названия пола')
            }
            const gender = await GenderModel.update(req.params.id, req.body)
            res.json(gender)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пола')
            }
            const gender = await GenderModel.delete(req.params.id)
            res.json(gender)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Gender()