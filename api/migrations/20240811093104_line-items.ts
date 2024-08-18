// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('line-items', (table) => {
    table.increments('id')
    table.integer('orderId').unsigned().references('id').inTable('orders').notNullable()
    table.string('productSku').references('sku').inTable('products').notNullable()
    table.integer('quantity').notNullable()
    table.decimal('price', 8, 2).notNullable()
    table.decimal('discount', 8, 2).defaultTo(0).notNullable()
    table.decimal('total', 8, 2).notNullable()
    table.timestamps(true, true, true)
    table.timestamp('deletedAt').nullable().defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('line-items')
}
