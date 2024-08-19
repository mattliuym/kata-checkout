import { FeathersService } from '@feathersjs/feathers'
import { Application } from '../../src/declarations'
import { OrdersParams, OrdersService } from '../../src/services/orders/orders'

export const scanner = async (
  service: FeathersService<Application, OrdersService<OrdersParams>>,
  data: string,
  orderId: number
) => {
  const skus = data.split('')

  for (const sku of skus) {
    await service.scan({ id: orderId, productSku: sku })
  }

  const orderComplete = await service.patch(orderId, { status: 'completed' })

  return orderComplete
}
