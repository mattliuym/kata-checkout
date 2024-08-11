// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.increments('id')
    table.enum('status', ['scanning', 'completed']).notNullable()
    table.decimal('total', 8, 2).defaultTo(0).notNullable()
    table.timestamps(true, true, true)
    table.timestamp('deletedAt').nullable().defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders')
}
