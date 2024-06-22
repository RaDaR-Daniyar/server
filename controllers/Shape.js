import ShapeModel from '../models/Shape.js'
import AppError from '../errors/AppError.js'

class Shape {
    async getAll(req, res, next) {
        try {
            const shapes = await ShapeModel.getAll()
            res.json(shapes)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id формы корпуса')
            }
            const shape = await ShapeModel.getOne(req.params.id)
            res.json(shape)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия формы корпуса')
            }
            const shape = await ShapeModel.create(req.body)
            res.json(shape)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id формы корпуса')
            }
            if (!req.body.name) {
                throw new Error('Нет названия формы корпуса')
            }
            const shape = await ShapeModel.update(req.params.id, req.body)
            res.json(shape)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id формы корпуса')
            }
            const shape = await ShapeModel.delete(req.params.id)
            res.json(shape)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Shape()