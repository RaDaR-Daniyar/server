import express from "express";
import { makeApiRequest } from "../services/BusinessAPI.js";
import pkg from "pg";
import cron from "node-cron";

import dotenv from "dotenv";

dotenv.config();
const { Client } = pkg;

const router = express.Router();

cron.schedule("0 0 * * *", async () => {
  console.log("Running loadDataToPostgreSQL");
  const products = await makeApiRequest();
  await loadProductsToPostgreSQL(products);
});

const insertOrUpdateAttribute = async (
  client,
  attributeId,
  attributeName,
  attributeTable
) => {
  const findAttributeQuery = `
    SELECT id FROM ${attributeTable} WHERE id = $1;
  `;
  const insertAttributeQuery = `
    INSERT INTO ${attributeTable} (id, name, created_at, updated_at)
    VALUES ($1, $2, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
  `;

  const { rows: attributeRows } = await client.query(findAttributeQuery, [
    attributeId,
  ]);

  if (attributeRows.length === 0) {
    await client.query(insertAttributeQuery, [attributeId, attributeName]);
  }
};

const insertData = async (client, data) => {
  const transformedData = data.map((item) => {
    const priceObj = item.prices.find(
      (price) => price.price_type.id === "75543"
    );
    const brandAttribute = item.attributes.find(
      (attr) => attr.attribute.id === "225412"
    );
    const mehanizmAttribute = item.attributes.find(
      (attr) => attr.attribute.id === "225417"
    );
    const genderAttribute = item.attributes.find(
      (attr) => attr.attribute.id === "225418"
    );
    const shapeAttribute = item.attributes.find(
      (attr) => attr.attribute.id === "227091"
    );
    const materialAttribute = item.attributes.find(
      (attr) => attr.attribute.id === "227093"
    );
    const glassAttribute = item.attributes.find(
      (attr) => attr.attribute.id === "227094"
    );
    const strapAttribute = item.attributes.find(
      (attr) => attr.attribute.id === "227096"
    );
    const powerAttribute = item.attributes.find(
      (attr) => attr.attribute.id === "227097"
    );
    const waterAttribute = item.attributes.find(
      (attr) => attr.attribute.id === "227098"
    );

    return {
      id: item.id,
      name: item.name,
      price: priceObj ? parseFloat(priceObj.price) : 0,
      rating: null,
      image: item.part,
      created_at: item.updated,
      updated_at: item.updated_remains_prices,
      category_id: null,
      brand_id: brandAttribute ? brandAttribute.value.id : null,
      brand_name: brandAttribute ? brandAttribute.value.name : null,
      mehanizm_id: mehanizmAttribute ? mehanizmAttribute.value.id : null,
      mehanizm_name: mehanizmAttribute ? mehanizmAttribute.value.name : null,
      gender_id: genderAttribute ? genderAttribute.value.id : null,
      gender_name: genderAttribute ? genderAttribute.value.name : null,
      material_id: materialAttribute ? materialAttribute.value.id : null,
      material_name: materialAttribute ? materialAttribute.value.name : null,
      shape_id: shapeAttribute ? shapeAttribute.value.id : null,
      shape_name: shapeAttribute ? shapeAttribute.value.name : null,
      glass_id: glassAttribute ? glassAttribute.value.id : null,
      glass_name: glassAttribute ? glassAttribute.value.name : null,
      strap_id: strapAttribute ? strapAttribute.value.id : null,
      strap_name: strapAttribute ? strapAttribute.value.name : null,
      power_id: powerAttribute ? powerAttribute.value.id : null,
      power_name: powerAttribute ? powerAttribute.value.name : null,
      water_id: waterAttribute ? waterAttribute.value.id : null,
      water_name: waterAttribute ? waterAttribute.value.name : null,
    };
  });

  const query = `
        INSERT INTO products (id, name, price, rating, image, created_at, updated_at, category_id, brand_id, mehanizm_id, gender_id, shape_id, material_id, glass_id,strap_id, power_id, water_id )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        ON CONFLICT (id) DO UPDATE SET
        id = EXCLUDED.id,
        name = EXCLUDED.name,
        price = EXCLUDED.price,
        rating = EXCLUDED.rating,
        image = EXCLUDED.image,
        created_at = EXCLUDED.created_at,
        updated_at = EXCLUDED.updated_at,
        category_id = EXCLUDED.category_id,
        brand_id = EXCLUDED.brand_id,
        mehanizm_id = EXCLUDED.mehanizm_id,
        gender_id = EXCLUDED.gender_id,
        shape_id = EXCLUDED.shape_id,
        material_id = EXCLUDED.material_id,
        glass_id = EXCLUDED.glass_id,
        strap_id = EXCLUDED.strap_id,
        power_id = EXCLUDED.power_id,
        water_id = EXCLUDED.water_id
    `;

  for (const item of transformedData) {
    if (item.brand_id) {
      await insertOrUpdateAttribute(
        client,
        item.brand_id,
        item.brand_name,
        "brands"
      );
    }
    if (item.mehanizm_id) {
      await insertOrUpdateAttribute(
        client,
        item.mehanizm_id,
        item.mehanizm_name,
        "mehanizms"
      );
    }
    if (item.gender_id) {
      await insertOrUpdateAttribute(
        client,
        item.gender_id,
        item.gender_name,
        "genders"
      );
    }
    if (item.shape_id) {
      await insertOrUpdateAttribute(
        client,
        item.shape_id,
        item.shape_name,
        "shapes"
      );
    }
    if (item.material_id) {
      await insertOrUpdateAttribute(
        client,
        item.material_id,
        item.material_name,
        "materials"
      );
    }
    if (item.glass_id) {
      await insertOrUpdateAttribute(
        client,
        item.glass_id,
        item.glass_name,
        "glasses"
      );
    }
    if (item.strap_id) {
      await insertOrUpdateAttribute(
        client,
        item.strap_id,
        item.strap_name,
        "straps"
      );
    }
    if (item.power_id) {
      await insertOrUpdateAttribute(
        client,
        item.power_id,
        item.power_name,
        "powers"
      );
    }
    if (item.water_id) {
      await insertOrUpdateAttribute(
        client,
        item.water_id,
        item.water_name,
        "waters"
      );
    }

    await client.query(query, [
      item.id,
      item.name,
      item.price,
      item.rating,
      item.image,
      item.created_at,
      item.updated_at,
      item.category_id,
      item.brand_id,
      item.mehanizm_id,
      item.gender_id,
      item.shape_id,
      item.material_id,
      item.glass_id,
      item.strap_id,
      item.power_id,
      item.water_id,
    ]);
  }
};

const loadProductsToPostgreSQL = async (data) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });
  try {
    await client.connect();
    await insertData(client, data);
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.end();
  }
};
router.get("/load-data", async (req, res) => {
  const products = await makeApiRequest();

  await loadProductsToPostgreSQL(products);
  res.send(products);
});

router.get("api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const products = await makeApiRequest();

  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) {
    res.status(404).send("Product not found.");
    return;
  }

  const collectionAttribute = selectedProduct.attributes.find(
    (attr) => attr.attribute.name === "Коллекция"
  );

  if (!collectionAttribute) {
    res.status(404).send("Collection attribute not found.");
    return;
  }

  const collectionId = collectionAttribute.value.id;

  const sameCollectionProducts = products.filter((product) => {
    const productCollectionAttr = product.attributes.find(
      (attr) => attr.attribute.name === "Коллекция"
    );
    return (
      productCollectionAttr && productCollectionAttr.value.id === collectionId
    );
  });

  res.json(sameCollectionProducts);
});

export default router;
