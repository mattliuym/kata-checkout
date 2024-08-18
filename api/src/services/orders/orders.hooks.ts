import { HookContext } from '@feathersjs/feathers'
import { LineItems } from '../line-items/line-items.class'

export const updateTotalPrice = async (context: HookContext) => {
  const { app, data } = context

  const lineItems = await app.service('line-items').find({
    query: {
      orderId: data.id
    }
  })

  const total = lineItems.data.reduce((acc: number, lineItem: LineItems) => {
    return acc + Number(lineItem.total)
  }, 0)

  const updatedOrder = await app.service('orders').patch(data.id, { total: total.toString() })

  context.result = updatedOrder
  return context
}
