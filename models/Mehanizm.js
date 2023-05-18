import { Mehanizm as MehanizmMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Mehanizm {
    async getAll() {
        const mehanizms = await MehanizmMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return mehanizms
    }
    async getOne(id) {
        const mehanizm = await MehanizmMapping.findByPk(id)
        if (!mehanizm) {
            throw new Error('Тип механизма не найден в БД')
        }
        return mehanizm
    }
    async create(data) {
        const {name} = data
        const exist = await MehanizmMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой Тип механизма уже есть')
        }
        const mehanizm = await MehanizmMapping.create({name})
        return mehanizm
    }
    async update(id, data) {
        const mehanizm = await MehanizmMapping.findByPk(id)
        if (!mehanizm) {
            throw new Error('Тип механизма не найден в БД')
        }
        const {name = mehanizm.name} = data
        await mehanizm.update({name})
        return mehanizm
    }
    async delete(id) {
        const mehanizm = await MehanizmMapping.findByPk(id)
        if (!mehanizm) {
            throw new Error('Тип механизма не найден в БД')
        }
        await mehanizm.destroy()
        return mehanizm
    }
}

export default new Mehanizm()