import { Strap as StrapMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Strap {
    async getAll() {
        const straps = await StrapMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return straps
    }
    async getOne(id) {
        const strap = await StrapMapping.findByPk(id)
        if (!strap) {
            throw new Error('Материал браслета не найден в БД')
        }
        return strap
    }
    async create(data) {
        const {name} = data
        const exist = await StrapMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой материал браслета уже есть')
        }
        const strap = await StrapMapping.create({name})
        return strap
    }
    async update(id, data) {
        const strap = await StrapMapping.findByPk(id)
        if (!strap) {
            throw new Error('Материал браслета не найден в БД')
        }
        const {name = strap.name} = data
        await strap.update({name})
        return strap
    }
    async delete(id) {
        const strap = await StrapMapping.findByPk(id)
        if (!strap) {
            throw new Error('Материал браслета не найден в БД')
        }
        await strap.destroy()
        return strap
    }
}

export default new Strap()