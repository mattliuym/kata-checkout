// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { KnexAdapterOptions, KnexAdapterParams } from '@feathersjs/knex'
import { KnexService } from '@feathersjs/knex'

import { BadRequest } from '@feathersjs/errors'
import type { Application } from '../../declarations'
import { DollarOffCampaign, SpecialPriceCampaign } from '../campaigns/campaigns.types'
import { calculateDollarOff, calculateSpecialPrice } from './orders.helper'
import type { Orders, OrdersData, OrdersPatch, OrdersQuery } from './orders.schema'
import { CalculateCampaign, ScanPayload } from './orders.types'

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

  async scan(data: ScanPayload, params?: OrdersParams): Promise<Orders> {
    const { id, productSku } = data

    const order = await this.get(id)

    if (!order) {
      throw new BadRequest('Order not found')
    }

    const productResults = await this.app.service('products').find({ query: { sku: productSku, $limit: 1 } })

    if (productResults.total === 0) {
      throw new BadRequest('Product not found')
    }
    const product = productResults.data[0]

    const campaign = await this.getActiveCampaigns(productSku)

    // check if line item exists by productSku
    const lineItemResult = await this.app
      .service('line-items')
      .find({ query: { orderId: id, productSku, $limit: 1 } })
    const hasLineItem = lineItemResult.total > 0

    const lineItem = hasLineItem ? lineItemResult.data[0] : null
    const newQuantity = lineItem ? lineItem.quantity + 1 : 1

    const lineItemTotal = this.calculateLineItemTotal({
      quantity: newQuantity,
      price: product.price,
      campaign
    })

    if (hasLineItem && lineItem) {
      await this.app.service('line-items').patch(
        lineItem.id,
        {
          quantity: newQuantity,
          total: lineItemTotal
        },
        { query: { orderId: id, productSku } }
      )
    } else {
      // add create new line item
      await this.app.service('line-items').create({
        orderId: id,
        productSku,
        price: product.price,
        quantity: newQuantity,
        total: lineItemTotal
      })
    }

    return order
  }

  private async getActiveCampaigns(productSku: string) {
    const campaignResult = await this.app.service('campaigns').find({
      query: {
        requiredProductSku: productSku,
        isActive: true,
        $limit: 1
      }
    })
    return campaignResult.total > 0 ? campaignResult.data[0] : null
  }

  private calculateLineItemTotal(params: CalculateCampaign): string {
    const { campaign, quantity, price } = params

    let total = (quantity * parseFloat(price)).toFixed(2)

    if (!campaign) {
      return total
    }

    switch (campaign.type) {
      case 'specialPrice':
        const specialPriceCampaign = campaign as SpecialPriceCampaign

        if (quantity >= campaign.requiredProductQuantity!) {
          total = calculateSpecialPrice({
            quantity,
            price,
            campaign: specialPriceCampaign
          })
        }
        break

      case 'dollarOff':
        const dollarOffCampaign = campaign as DollarOffCampaign

        total = calculateDollarOff({
          quantity,
          price,
          campaign: dollarOffCampaign
        })

        break
    }

    return total
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
