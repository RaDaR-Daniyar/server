import { Glass as GlassMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Glass {
    async getAll() {
        const glasss = await GlassMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return glasss
    }
    async getOne(id) {
        const glass = await GlassMapping.findByPk(id)
        if (!glass) {
            throw new Error('Тип стекла не найден в БД')
        }
        return glass
    }
    async create(data) {
        const {name} = data
        const exist = await GlassMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой тип стекла уже есть')
        }
        const glass = await GlassMapping.create({name})
        return glass
    }
    async update(id, data) {
        const glass = await GlassMapping.findByPk(id)
        if (!glass) {
            throw new Error('Тип стекла не найден в БД')
        }
        const {name = glass.name} = data
        await glass.update({name})
        return glass
    }
    async delete(id) {
        const glass = await GlassMapping.findByPk(id)
        if (!glass) {
            throw new Error('Тип стекла не найден в БД')
        }
        await glass.destroy()
        return glass
    }
}

export default new Glass()