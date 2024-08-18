// import knex from 'knex'
// import 'mocha'
// import sinon from 'sinon'
// import { app } from '../src/app'
// import { init } from './setup/database'
// import { mockStripeGetProductPrices } from './test-helpers/stripe-mocks'

// before(async () => {
//   const database = knex(app.get('mysql'))

//   const dbNameResult = await database.raw('select database() as dbName')
//   const dbName: string = dbNameResult[0][0]['dbName']

//   if (!dbName.includes('test')) {
//     throw Error('Test db should contain "test" keyword in its name')
//   }

//   const allTableResult = await database.raw('show tables')
//   const allTableNames: string[] = allTableResult[0].map((d: any) => d[`Tables_in_${dbName}`])

//   await database.raw('SET foreign_key_checks = 0')
//   for (const table of allTableNames) {
//     await database.raw(`drop table ${table}`)
//   }
//   await database.raw('SET foreign_key_checks = 1')

//   await database.migrate.latest()

//   mockStripeGetProductPrices()

//   await init(app)
// })

// afterEach(function () {
//   sinon.restore()
// })

// afterEach(() => {
//   sinon.restore()
// })
