import { iProduct } from "api/ProductSqlModel";
import { Knex } from "knex";
const jsonProducts = require('../products.json');


export async function seed(knex: Knex): Promise<void> {
    await knex("product").del();

    const products = jsonProducts.map((product: iProduct) => {
        const { id, title, price, ["striked-price"]: striked_price, image, vendor } = product;
        return {
            id,
            title,
            price,
            striked_price,
            image,
            vendor
        }
    })

    await knex("product").insert(products);
};
