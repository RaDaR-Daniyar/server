import CatalogtModel from '../models/Admin.js'
import AppError from '../errors/AppError.js'

class Product {
    async getAll(req, res, next) {
        try {
            const { categoryId = null, brandId = null } = req.params;
            let { limit = null, page = null, searchTerm = '' } = req.query;
            limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 3
            page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1
            console.log(searchTerm)
            const options = {categoryId, brandId, limit, page, searchTerm}
            const products = await CatalogtModel.getAll(options)
            res.json(products)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    // Выдает рандомные товары
    async getRandom(req, res, next) {
        try {
            const { categoryId = null, brandId = null } = req.params;

            const count = await CatalogtModel.getCount();

            // Генерирует номер рандомной страницы из 35 продуктов
            const randomPage = Math.floor(Math.random() * (Math.floor(count / 35) - 1 + 1)) + 1;

            if (!randomPage) {
                randomPage = 1;
            }

            const options = { categoryId, brandId, limit: 35, page: randomPage }
            const products = await CatalogtModel.getAll(options);

            // Перемешивает список продуктов
            const finalyProducts = products.rows.sort(() => Math.random() - 0.5);
            // Уменьшает список до 25 продуктов
            if (finalyProducts.length > 25) {
                finalyProducts.length = 25;
            }

            res.json(finalyProducts);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await CatalogtModel.getOne(req.params.id)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const product = await CatalogtModel.create(req.body, req.files?.image)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const product = await CatalogtModel.update(req.params.id, req.body, req.files?.image)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await CatalogtModel.delete(req.params.id)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Product()