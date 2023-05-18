import { Power as PowerMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Power {
    async getAll() {
        const powers = await PowerMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return powers
    }
    async getOne(id) {
        const power = await PowerMapping.findByPk(id)
        if (!power) {
            throw new Error('Срока запаса хода не найден в БД')
        }
        return power
    }
    async create(data) {
        const {name} = data
        const exist = await PowerMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой Срока запаса хода уже есть')
        }
        const power = await PowerMapping.create({name})
        return power
    }
    async update(id, data) {
        const power = await PowerMapping.findByPk(id)
        if (!power) {
            throw new Error('Срока запаса хода не найден в БД')
        }
        const {name = power.name} = data
        await power.update({name})
        return power
    }
    async delete(id) {
        const power = await PowerMapping.findByPk(id)
        if (!power) {
            throw new Error('Срока запаса хода не найден в БД')
        }
        await power.destroy()
        return power
    }
}

export default new Power()