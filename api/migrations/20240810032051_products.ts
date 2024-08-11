// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('sku').notNullable().unique()
    table.json('metaData')
    table.timestamps(true, true, true)
    table.timestamp('deletedAt').nullable().defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products')
}
