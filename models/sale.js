import { Fin as SaleMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Sale {
    async getAll() {
        const sale = await SaleMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return sale
    }
    async getOne(id) {
        const sale = await SaleMapping.findByPk(id)
        if (!sale) {
            throw new Error('Скидка не найдена в БД')
        }
        return sale
    }
    async create(data) {
        const {name, id} = data
        const exist = await SaleMapping.findOne({where: {name, id}})
        if (exist) {
            throw new Error('Такая скидка уже есть')
        }
        const sale = await SaleMapping.create({name, id})
        return sale
    }
    async update(id, data) {
        const sale = await SaleMapping.findByPk(id)
        if (!sale) {
            throw new Error('Скидка не найдена в БД')
        }
        const {name = sale.name} = data
        await sale.update({name})
        return sale
    }
    async delete(id) {
        const sale = await SaleMapping.findByPk(id)
        if (!sale) {
            throw new Error('Скидка не найдена в БД')
        }
        await sale.destroy()
        return sale
    }
}

export default new Sale()