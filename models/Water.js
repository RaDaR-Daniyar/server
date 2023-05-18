import { Water as WaterMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Water {
    async getAll() {
        const waters = await WaterMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return waters
    }
    async getOne(id) {
        const water = await WaterMapping.findByPk(id)
        if (!water) {
            throw new Error('Водонепроницаемость не найдена в БД')
        }
        return water
    }
    async create(data) {
        const {name} = data
        const exist = await WaterMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такая водонепроницаемость уже есть')
        }
        const water = await WaterMapping.create({name})
        return water
    }
    async update(id, data) {
        const water = await WaterMapping.findByPk(id)
        if (!water) {
            throw new Error('Водонепроницаемость не найдена в БД')
        }
        const {name = water.name} = data
        await water.update({name})
        return water
    }
    async delete(id) {
        const water = await WaterMapping.findByPk(id)
        if (!water) {
            throw new Error('Водонепроницаемость не найдена в БД')
        }
        await water.destroy()
        return water
    }
}

export default new Water()