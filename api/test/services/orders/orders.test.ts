// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'
import { scanner } from '../../helpers/scanner'

describe('orders service', () => {
  it('registered the service', () => {
    const service = app.service('orders')

    assert.ok(service, 'Registered the service')
  })

  it('create and finish an order', async () => {
    const service = app.service('orders')

    const order = await service.create({})

    assert.strictEqual(order.status, 'scanning')
    assert.strictEqual(order.total, '0.00')

    const oderComplete = await service.patch(order.id, { status: 'completed' })

    assert.strictEqual(oderComplete.status, 'completed')
    assert.strictEqual(oderComplete.total, '0.00')
  })

  it('scan item AABC', async () => {
    const service = app.service('orders')
    const order = await service.create({})

    const result = await service.scan({ id: order.id, productSku: 'A' })
    const result1 = await service.scan({ id: order.id, productSku: 'A' })
    const result2 = await service.scan({ id: order.id, productSku: 'B' })
    const result3 = await service.scan({ id: order.id, productSku: 'C' })

    const orderComplete = await service.patch(order.id, { status: 'completed' })

    assert.strictEqual(result.total, '1.00')
    assert.strictEqual(result1.total, '2.00')
    assert.strictEqual(result2.total, '4.00')
    assert.strictEqual(result3.total, '7.00')

    assert.equal(orderComplete.total, '7.00')
    assert.equal(orderComplete.status, 'completed')
  })

  it('scan item AAAB', async () => {
    const service = app.service('orders')
    const order = await service.create({})

    const result = await service.scan({ id: order.id, productSku: 'A' })
    const result1 = await service.scan({ id: order.id, productSku: 'A' })
    const result2 = await service.scan({ id: order.id, productSku: 'A' })
    const result3 = await service.scan({ id: order.id, productSku: 'B' })

    const orderComplete = await service.patch(order.id, { status: 'completed' })

    assert.strictEqual(result.total, '1.00')
    assert.strictEqual(result1.total, '2.00')
    assert.strictEqual(result2.total, '2.50')
    assert.strictEqual(result3.total, '4.50')

    assert.strictEqual(orderComplete.total, '4.50')
    assert.strictEqual(orderComplete.status, 'completed')
  })

  it('scan item ABACCCBBA', async () => {
    const service = app.service('orders')
    const order = await service.create({})

    const result = await service.scan({ id: order.id, productSku: 'A' })
    const result1 = await service.scan({ id: order.id, productSku: 'B' })
    const result2 = await service.scan({ id: order.id, productSku: 'A' })
    const result3 = await service.scan({ id: order.id, productSku: 'C' })
    const result4 = await service.scan({ id: order.id, productSku: 'C' })
    const result5 = await service.scan({ id: order.id, productSku: 'C' })
    const result6 = await service.scan({ id: order.id, productSku: 'B' })
    const result7 = await service.scan({ id: order.id, productSku: 'B' })
    const result8 = await service.scan({ id: order.id, productSku: 'A' })

    const orderComplete = await service.patch(order.id, { status: 'completed' })

    assert.strictEqual(result.total, '1.00')
    assert.strictEqual(result1.total, '3.00')
    assert.strictEqual(result2.total, '4.00')
    assert.strictEqual(result3.total, '7.00')
    assert.strictEqual(result4.total, '10.00')
    assert.strictEqual(result5.total, '13.00')
    assert.strictEqual(result6.total, '14.00')
    assert.strictEqual(result7.total, '16.00')
    assert.strictEqual(result8.total, '16.50')

    assert.strictEqual(orderComplete.total, '16.50')
    assert.strictEqual(orderComplete.status, 'completed')
  })

  it('scan item AAA altogether', async () => {
    const service = app.service('orders')
    const order = await service.create({})

    const orderResult = await scanner(service, 'AAA', order.id)

    assert.strictEqual(orderResult.total, '2.50')
  })

  it('scan item ABACCCBBA altogether', async () => {
    const service = app.service('orders')
    const order = await service.create({})

    const orderResult = await scanner(service, 'ABACCCBBA', order.id)

    assert.strictEqual(orderResult.total, '16.50')
  })

  it('scan item DDDDDDD', async () => {
    const service = app.service('orders')
    const order = await service.create({})

    const orderResult = await scanner(service, 'DDDDDDD', order.id)

    assert.strictEqual(orderResult.total, '26.50')
  })

  it('scan item DDDDDDDD', async () => {
    const service = app.service('orders')
    const order = await service.create({})

    const orderResult = await scanner(service, 'DDDDDDDD', order.id)

    assert.strictEqual(orderResult.total, '29.00')
  })

  it('scan item EEEEEE', async () => {
    const service = app.service('orders')
    const order = await service.create({})

    const orderResult = await scanner(service, 'EEEEEE', order.id)

    assert.strictEqual(orderResult.total, '15.00')
  })
})
