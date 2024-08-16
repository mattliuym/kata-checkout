// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { KnexAdapterOptions, KnexAdapterParams } from '@feathersjs/knex'
import { KnexService } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Orders, OrdersData, OrdersPatch, OrdersQuery } from './orders.schema'
import { ScanPayload } from './orders.types'
import { BadRequest } from '@feathersjs/errors'
import { CalculateSpecialPrice } from './orders.helper'

export type { Orders, OrdersData, OrdersPatch, OrdersQuery }

export interface OrdersParams extends KnexAdapterParams<OrdersQuery> {}

interface ServiceOptions extends KnexAdapterOptions {
  app: Application
}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class OrdersService<ServiceParams extends Params = OrdersParams> extends KnexService<
  Orders,
  OrdersData,
  OrdersParams,
  OrdersPatch
> {
  private app

  constructor(options: ServiceOptions) {
    super(options)
    this.app = options.app
  }

  async scan(id: number, data: ScanPayload, params?: OrdersParams): Promise<Orders> {
    const { productSku } = data

    const order = await this.get(id)

    if (!order) {
      throw new BadRequest('Order not found')
    }

    const productResults = await this.app.service('products').find({ query: { sku: productSku, $limit: 1 } })

    if (productResults.total === 0) {
      throw new BadRequest('Product not found')
    }
    const product = productResults.data[0]

    const campaignResult = await this.app.service('campaigns').find({
      query: {
        requiredProductSku: productSku,
        isActive: true
      }
    })

    const campaign = campaignResult.total > 0 ? campaignResult.data[0] : null

    // check if line item exists by productSku
    const lineItemResult = await this.app
      .service('line-items')
      .find({ query: { orderId: id, productSku, $limit: 1 } })
    const hasLineItem = lineItemResult.total > 0

    if (hasLineItem) {
      const lineItem = lineItemResult.data[0]
      const quantity = lineItem.quantity + 1
      const total = quantity * Number(lineItem.price)
      // todo add calculate campaign discount
      if (campaign && campaign.type === 'specialPrice') {
        const newTotal = CalculateSpecialPrice({
          productPrice: product.price,
          currentQuantity: quantity,
          requiredQuantity: campaign.requiredProductQuantity,
          specialPrice: campaign.specialPrice
        })
      }

      await this.app.service('line-items').patch(
        lineItem.id,
        {
          quantity,
          total: total.toFixed(2)
        },
        { query: { orderId: id, productSku } }
      )
    } else {
      // add create new line item
      // todo add calculate discount
      await this.app.service('line-items').create({
        orderId: id,
        productSku,
        price: product.price,
        quantity: 1,
        total: product.price
      })
    }

    return order
  }
}

export const getOptions = (app: Application): ServiceOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'orders',
    app
  }
}
