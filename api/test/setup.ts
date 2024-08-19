import knex from 'knex'
import 'mocha'
import { app } from '../src/app'
import { init } from './setup/database'

before(async () => {
  const database = knex(app.get('mysql'))

  const dbNameResult = await database.raw('select database() as dbName')
  const dbName: string = dbNameResult[0][0]['dbName']

  if (!dbName.includes('test')) {
    throw Error('Test db should contain "test" keyword in its name')
  }

  const allTableResult = await database.raw('show tables')
  const allTableNames: string[] = allTableResult[0].map((d: any) => d[`Tables_in_${dbName}`])

  await database.raw('SET foreign_key_checks = 0')
  for (const table of allTableNames) {
    await database.raw(`DROP table ${table}`)
  }
  await database.raw('SET foreign_key_checks = 1')

  await database.migrate.latest()
  await init(app)
})
