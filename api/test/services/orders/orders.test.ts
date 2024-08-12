// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'

describe('orders service', () => {
  it('registered the service', () => {
    const service = app.service('orders')

    assert.ok(service, 'Registered the service')
  })

  it('create/finish an order', async () => {
    const service = app.service('orders')

    const order = await service.create({})

    assert.strictEqual(order.status, 'scanning')
    assert.strictEqual(order.total, '0.00')

    const oderComplete = await service.patch(order.id, { status: 'completed' })

    assert.strictEqual(oderComplete.status, 'completed')
    assert.strictEqual(oderComplete.total, '0.00')
  })
})
