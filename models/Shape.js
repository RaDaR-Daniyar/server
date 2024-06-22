import { Shape as ShapeMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Shape {
    async getAll() {
        const shapes = await ShapeMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return shapes
    }
    async getOne(id) {
        const shape = await ShapeMapping.findByPk(id)
        if (!shape) {
            throw new Error('Форма корпуса не найдена в БД')
        }
        return shape
    }
    async create(data) {
        const {name} = data
        const exist = await ShapeMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такая форма корпуса уже есть')
        }
        const shape = await ShapeMapping.create({name})
        return shape
    }
    async update(id, data) {
        const shape = await ShapeMapping.findByPk(id)
        if (!shape) {
            throw new Error('Форма корпуса не найдена в БД')
        }
        const {name = shape.name} = data
        await shape.update({name})
        return shape
    }
    async delete(id) {
        const shape = await ShapeMapping.findByPk(id)
        if (!shape) {
            throw new Error('Форма корпуса не найдена в БД')
        }
        await shape.destroy()
        return shape
    }
}

export default new Shape()