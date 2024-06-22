import express from "express";
import pkg from "pg";
import { makeApiRequest } from "../services/BusinessAPI.js";
const router = express.Router();
const { Client } = pkg;

router.get("/:productId", async (req, res) => {
  const productId = Number(req.params.productId);

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const productRes = await client.query(
      "SELECT p.*, g.name as gender, b.name as brand FROM products p " +
        "JOIN genders g ON p.gender_id = g.id " +
        "JOIN brands b ON p.brand_id = b.id " +
        "WHERE p.id = $1",
      [productId]
    );
    const selectedProduct = productRes.rows[0];

    if (!selectedProduct) {
      res.status(404).send("Product not found.");
      return;
    }

    const { gender, brand } = selectedProduct;

    const productsRes = await client.query(
      "SELECT p.*, g.name as gender, b.name as brand FROM products p " +
        "JOIN genders g ON p.gender_id = g.id " +
        "JOIN brands b ON p.brand_id = b.id " +
        "WHERE g.name = $1 AND b.name = $2",
      [gender, brand]
    );

    if (productsRes.rows.length){
      if (productsRes.rows.length > 21) {
        productsRes.rows.length = 21;
      }

      var sameGenderAndBrandProducts = productsRes.rows.filter(product => product.id !== selectedProduct.id);
    }


    res.json(sameGenderAndBrandProducts);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.end();
  }
});
router.get("/brend/:productId", async (req, res) => {
  const productId = Number(req.params.productId);

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const productRes = await client.query(
      "SELECT p.*, g.name as brend, b.name as brand FROM products p " +
        "JOIN brends g ON p.brend_id = g.id " +
        "JOIN brands b ON p.brand_id = b.id " +
        "WHERE p.id = $1",
      [productId]
    );
    const selectedProduct = productRes.rows[0];

    if (!selectedProduct) {
      res.status(404).send("Product not found.");
      return;
    }

    const { brend_id } = selectedProduct;

    const productsRes = await client.query(
      "SELECT p.*, g.id as brend FROM products p " +
        "JOIN brends g ON p.brend_id = g.id " +
        "JOIN brands b ON p.brand_id = b.id " +
        "WHERE g.id = $1",
      [brend_id]
    );
    if (productsRes.rows.length) {
      if (productsRes.rows.length > 21) {
        productsRes.rows.length = 21;
      }

      var brendProducts = productsRes.rows.filter(product => product.id !== selectedProduct.id);;
    }


    res.json(brendProducts);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error" + error);
  } finally {
    await client.end();
  }
});

export default router;
