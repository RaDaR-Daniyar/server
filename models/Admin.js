import pkg from 'sequelize';
import { Product as ProductMapping } from './mapping.js';
import { ProductProp as ProductPropMapping } from './mapping.js';
import { Brand as BrandMapping } from './mapping.js';
import { Mehanizm as MehanizmMapping } from './mapping.js';
import { Gender as GenderMapping } from './mapping.js';
import { Shape as ShapeMapping } from './mapping.js';
import { Material as MaterialMapping } from './mapping.js';
import { Glass as GlassMapping } from './mapping.js';
import { Strap as StrapMapping } from './mapping.js';
import { Power as PowerMapping } from './mapping.js';
import { Water as WaterMapping } from './mapping.js';
import { Category as CategoryMapping } from './mapping.js';
import FileService from '../services/File.js';
import AppError from '../errors/AppError.js';

class Catalog {
    async getAll(options) {
        const {categoryId, brandId, mehanizmId, genderId, shapeId, materialId, glassId, strapId, powerId, waterId, limit, page, searchTerm, sortOrder, minPrice, maxPrice} = options;
        const { Op } = pkg;
        const offset = (page - 1) * limit;
        const where = {};
        if (categoryId) where.categoryId = categoryId;
        if (brandId) where.brandId = brandId;
        if (mehanizmId) where.mehanizmId = mehanizmId;
        if (genderId) where.genderId = genderId;
        if (shapeId) where.shapeId = shapeId;
        if (materialId) where.materialId = materialId;
        if (glassId) where.glassId = glassId;
        if (strapId) where.strapId = strapId;
        if (powerId) where.powerId = powerId;
        if (waterId) where.waterId = waterId;

        if (searchTerm) {
            where[Op.or] = [{ name: { [Op.iLike]: `%${searchTerm}%` } }];
        }

        function getOrderArray(sortOrder) {
            console.log(sortOrder);
            switch (sortOrder) {
                case 'less':
                return [['price', 'ASC']];
                case 'more':
                return [['price', 'DESC']];
                default:
                return [['name', 'ASC']];
            }
        }
        const products = await ProductMapping.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                { model: BrandMapping, as: 'brand' },
                { model: MehanizmMapping, as: 'mehanizm' },
                { model: GenderMapping, as: 'gender' },
                { model: ShapeMapping, as: 'shape' },
                { model: MaterialMapping, as: 'material' },
                { model: GlassMapping, as: 'glass' },
                { model: StrapMapping, as: 'strap' },
                { model: PowerMapping, as: 'power' },
                { model: WaterMapping, as: 'water' },
                { model: CategoryMapping, as: 'category' },
            ],
            order: getOrderArray(sortOrder),
        });

        return products;
    }
    async getOne(id) {
        const product = await ProductMapping.findByPk(id, {
        include: [
            { model: ProductPropMapping, as: 'props' },
            { model: BrandMapping, as: 'brand' },
            { model: MehanizmMapping, as: 'mehanizm' },
            { model: GenderMapping, as: 'gender' },
            { model: ShapeMapping, as: 'shape' },
            { model: MaterialMapping, as: 'material' },
            { model: GlassMapping, as: 'glass' },
            { model: StrapMapping, as: 'strap' },
            { model: PowerMapping, as: 'power' },
            { model: WaterMapping, as: 'water' },
            { model: CategoryMapping, as: 'category' },
        ],
        });
        if (!product) {
            throw new Error('Товар не найден в БД');
        }
        return product;
    }
    async getOneByName(name) {
        const product = await ProductMapping.findOne(name);
        if (!product) {
        throw new Error('Товар не найден в БД');
        }
        return product;
    }
    async create(data, img) {
        const image = FileService.save(img) ?? '';
        const {name, price, categoryId = null, brandId = null, mehanizmId = null, genderId = null, shapeId = null, materialId = null, glassId = null, strapId = null, powerId = null, waterId = null} = data;
        const product = await ProductMapping.create({name, price, image, categoryId, brandId, mehanizmId, genderId, shapeId, materialId, glassId, strapId, powerId, waterId});
        if (data.props) {
            const props = JSON.parse(data.props);
            for (let prop of props) {
                await ProductPropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id,
                });
            }
        }
        const created = await ProductMapping.findByPk(product.id, {
            include: [{ model: ProductPropMapping, as: 'props' }],
        });
        return created;
    }

    async getCount() {
        return await ProductMapping.count();
    }

    async update(id, data, img) {
        const product = await ProductMapping.findByPk(id, {
            include: [{ model: ProductPropMapping, as: 'props' }],
        });
        if (!product) {
            throw new Error('Товар не найден в БД');
        }
        const file = FileService.save(img);
        if (file && product.image) {
            FileService.delete(product.image);
        }
        const {
            name = product.name,
            price = product.price,
            categoryId = product.categoryId,
            brandId = product.brandId,
            mehanizmId = product.mehanizmId,
            genderId = product.genderId,
            shapeId = product.shapeId,
            materialId = product.materialId,
            glassId = product.glassId,
            strapId = product.strapId,
            powerId = product.powerId,
            waterId = product.waterId,
            image = file ? file : product.image,
        } = data;
        await product.update({name, price, categoryId, image, brandId, mehanizmId, genderId, shapeId, materialId, glassId, strapId, powerId, waterId});
        if (data.props) {
            await ProductPropMapping.destroy({ where: { productId: id } });
            const props = JSON.parse(data.props);
            for (let prop of props) {
                await ProductPropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id,
                });
            }
        }
        await product.reload();
        return product;
    }
    async delete(id) {
        const product = await ProductMapping.findByPk(id);
        if (!product) {
            throw new Error('Товар не найден в БД');
        }
            if (product.image) {
            FileService.delete(product.image);
        }
        await product.destroy();
        return product;
    }
    async isExist(id) {
        const basket = await ProductMapping.findByPk(id);
        return basket;
    }
}

export default new Catalog();