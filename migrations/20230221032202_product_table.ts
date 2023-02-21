import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product', (table) => {
    table.bigInteger('id').unique().notNullable().primary();
    table.string('title');
    table.string('price', 100);
    table.string('striked_price');
    table.string('image');
    table.string('vendor');

    const useTimestamps = true;
    const defaultToNow = true;
    table.timestamps(useTimestamps, defaultToNow);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('product');
}
