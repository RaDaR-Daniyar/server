import ProductModel from '../models/Product.js';
import AppError from '../errors/AppError.js';
import { Product as ProductMapping } from '../models/mapping.js';
import { Brand as BrandMapping } from '../models/mapping.js';

class Product {
    async getAll(req, res, next) {
        try {
            let { categoryId = null, brandId = null, mehanizmId = null, genderId = null, shapeId = null, materialId = null,
                glassId = null, strapId = null, powerId = null, waterId = null, brendId = null, limit = null, page = null, searchTerm = '', sortOrder = '', minPrice, maxPrice, sale } = req.query;

            sale = (sale === 'true');
            minPrice = parseInt(minPrice);
            maxPrice = parseInt(maxPrice);
            limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 3;
            page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1;
            const options = {categoryId, brandId, mehanizmId, genderId, shapeId, materialId, glassId, strapId, powerId, waterId, brendId, limit, page, searchTerm, sortOrder, minPrice, maxPrice, sale};
            const products = await ProductModel.getAll(options);
            res.json(products);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара');
            }
            const product = await ProductModel.getOne(req.params.id);
            res.json(product);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания');
            }
            const product = await ProductModel.create(req.body, req.files?.image);
            res.json(product);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара');
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления');
            }
            const product = await ProductModel.update(req.params.id, req.body, req.files?.image);
            res.json(product);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара');
            }
            const product = await ProductModel.delete(req.params.id);
            res.json(product);
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
    async price(req, res, next) {
        try {
            const products = await ProductMapping.findAll({
                include: [{ model: BrandMapping, as: 'brand' }],
                order: [['price', 'ASC']],
            });
            const min = products[0].price;
            const max = products[products.length - 1].price;
            res.json({ min, max, products });
        } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }
}

export default new Product();