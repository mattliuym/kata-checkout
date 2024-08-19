import { Application } from '@feathersjs/koa'
import { Campaigns } from '../../src/services/campaigns/campaigns'
import { Products } from '../../src/services/products/products'

export const testProducts: Partial<Products>[] = [
  {
    id: 1,
    name: 'Apple',
    sku: 'A',
    price: '1.00',
    metaData: {
      test: true
    }
  },
  {
    id: 2,
    name: 'Banana',
    sku: 'B',
    price: '2.00'
  },
  {
    id: 3,
    name: 'Cherry',
    sku: 'C',
    price: '3.00'
  }
]

export const specialPriceCampaign: Partial<Campaigns>[] = [
  {
    id: 1,
    name: 'Buy 3 for $2',
    type: 'specialPrice',
    requiredProductSku: 'A',
    requiredProductQuantity: 3,
    specialPrice: '2.00',
    isActive: true
  },
  {
    id: 2,
    name: 'Buy 2 for $3',
    type: 'specialPrice',
    requiredProductSku: 'B',
    requiredProductQuantity: 2,
    specialPrice: '3.00',
    isActive: true
  },
  {
    id: 3,
    name: 'Buy 1 for $2',
    type: 'specialPrice',
    requiredProductSku: 'C',
    requiredProductQuantity: 1,
    specialPrice: '2.00',
    isActive: false
  }
]

export const init = async (app: Application) => {
  await Promise.all(testProducts.map((product) => app.service('products').create(product)))
  await Promise.all(specialPriceCampaign.map((campaign) => app.service('campaigns').create(campaign)))
}
