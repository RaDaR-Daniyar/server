import { Brend as BrendMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Brend {
    async getAll() {
        const brends = await BrendMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return brends
    }
    async getOne(id) {
        const brend = await BrendMapping.findByPk(id)
        if (!brend) {
            throw new Error('Бренд не найден в БД')
        }
        return brend
    }
    async create(data) {
        const {name} = data
        const exist = await BrendMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой бренд уже есть')
        }
        const brend = await BrendMapping.create({name})
        return brend
    }
    async update(id, data) {
        const brend = await BrendMapping.findByPk(id)
        if (!brend) {
            throw new Error('Бренд не найден в БД')
        }
        const {name = brend.name} = data
        await brend.update({name})
        return brend
    }
    async delete(id) {
        const brend = await BrendMapping.findByPk(id)
        if (!brend) {
            throw new Error('Бренд не найден в БД')
        }
        await brend.destroy()
        return brend
    }
}

export default new Brend()