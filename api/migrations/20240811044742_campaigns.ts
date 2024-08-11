// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('campaigns', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.enum('type', ['specialPrice', 'amountOff', 'percentageOff']).notNullable()
    table.string('requiredProductSku').references('sku').inTable('products')
    table.integer('requiredProductQuantity')
    table.string('targetProductSku').references('sku').inTable('products')
    table.integer('targetProductQuantity')
    table.decimal('specialPrice', 8, 2)
    table.integer('amountOff')
    table.integer('percentageOff')
    table.boolean('isActive').defaultTo(true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('campaigns')
}
