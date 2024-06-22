import MaterialModel from '../models/Material.js'
import AppError from '../errors/AppError.js'

class Material {
    async getAll(req, res, next) {
        try {
            const materials = await MaterialModel.getAll()
            res.json(materials)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id материал корпуса')
            }
            const material = await MaterialModel.getOne(req.params.id)
            res.json(material)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия материал корпуса')
            }
            const material = await MaterialModel.create(req.body)
            res.json(material)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id материал корпуса')
            }
            if (!req.body.name) {
                throw new Error('Нет названия материал корпуса')
            }
            const material = await MaterialModel.update(req.params.id, req.body)
            res.json(material)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id материал корпуса')
            }
            const material = await MaterialModel.delete(req.params.id)
            res.json(material)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Material()