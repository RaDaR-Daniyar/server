import { Gender as GenderMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Gender {
    async getAll() {
        const genders = await GenderMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return genders
    }
    async getOne(id) {
        const gender = await GenderMapping.findByPk(id)
        if (!gender) {
            throw new Error('Пол не найден в БД')
        }
        return gender
    }
    async create(data) {
        const {name} = data
        const exist = await GenderMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой пол уже есть')
        }
        const gender = await GenderMapping.create({name})
        return gender
    }
    async update(id, data) {
        const gender = await GenderMapping.findByPk(id)
        if (!gender) {
            throw new Error('Пол не найден в БД')
        }
        const {name = gender.name} = data
        await gender.update({name})
        return gender
    }
    async delete(id) {
        const gender = await GenderMapping.findByPk(id)
        if (!gender) {
            throw new Error('Пол не найден в БД')
        }
        await gender.destroy()
        return gender
    }
}

export default new Gender()