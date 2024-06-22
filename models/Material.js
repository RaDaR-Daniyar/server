import { Material as MaterialMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Material {
    async getAll() {
        const materials = await MaterialMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return materials
    }
    async getOne(id) {
        const material = await MaterialMapping.findByPk(id)
        if (!material) {
            throw new Error('Материал корпуса не найден в БД')
        }
        return material
    }
    async create(data) {
        const {name} = data
        const exist = await MaterialMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой материал корпуса уже есть')
        }
        const material = await MaterialMapping.create({name})
        return material
    }
    async update(id, data) {
        const material = await MaterialMapping.findByPk(id)
        if (!material) {
            throw new Error('Материал корпуса не найден в БД')
        }
        const {name = material.name} = data
        await material.update({name})
        return material
    }
    async delete(id) {
        const material = await MaterialMapping.findByPk(id)
        if (!material) {
            throw new Error('Материал корпуса не найден в БД')
        }
        await material.destroy()
        return material
    }
}

export default new Material()