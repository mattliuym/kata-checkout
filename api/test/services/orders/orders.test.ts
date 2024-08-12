// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'

describe('orders service', () => {
  it('registered the service', () => {
    const service = app.service('orders')

    assert.ok(service, 'Registered the service')
  })

  // it('create/finish an order', async () => {
  //   const service = app.service('orders')

  //   const order = await service.create({})

  //   assert.strictEqual(order.status, 'scanning')
  //   assert.strictEqual(order.total, '0.00')

  //   const oderComplete = await service.patch(order.id, { status: 'completed' })

  //   assert.strictEqual(oderComplete.status, 'completed')
  //   assert.strictEqual(oderComplete.total, '0.00')
  // })

  it('add line item B', async () => {
    const service = app.service('orders')

    const order = await service.get(5) // use a fix order id for now

    const result = await service.scan(5, { productSku: 'B' })

    console.log('result==>', result)

    // assert.strictEqual(lineItem.quantity, 1)
    // assert.strictEqual(lineItem.total, 30)
  })
})
