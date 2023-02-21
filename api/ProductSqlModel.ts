import { knexConfig } from "knexfile";

const Knex = require('knex');
const knex = Knex(knexConfig);

export interface iProduct {
  id: number
  title: string
  price: string
  ["striked-price"]: string
  image: string
  vendor: string
}

export const searchProducts = async (limit: number, offset: number, search: string) => {
  if (search === '') {
    const products = await knex('product')
      .limit(limit)
      .offset(offset);
    return products;
  }
  const products = await knex('product')
    .whereRaw('title ILIKE ?', search)
    .orWhereRaw('vendor LIKE ?', search)
    .limit(limit)
    .offset(offset);
  return products;
}

export const getTotalProducts = async (search: string): Promise<number> => {
  if (search === '') {
    const [{ count }] = await knex('product').count();
    return count;
  }
  const [{ count }] = await knex('product')
    .count(knex.raw('title ILIKE ? OR vendor LIKE ?', [search, search]));
  return Number(count);
}

