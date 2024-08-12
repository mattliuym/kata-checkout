// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'

describe('line-items service', () => {
  it('registered the service', () => {
    const service = app.service('line-items')

    assert.ok(service, 'Registered the service')
  })

  it('test line-items service', async () => {
    const service = app.service('line-items')

    const result = await service.find()

    assert.ok(result, 'line-items service working')
  })
})
