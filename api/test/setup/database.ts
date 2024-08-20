import { Application } from '@feathersjs/koa'
import { Campaigns } from '../../src/services/campaigns/campaigns'
import { Products } from '../../src/services/products/products'

export const testProducts: Partial<Products>[] = [
  {
    name: 'Apple',
    sku: 'A',
    price: '1.00',
    metaData: {
      test: true
    }
  },
  {
    name: 'Banana',
    sku: 'B',
    price: '2.00'
  },
  {
    name: 'Cherry',
    sku: 'C',
    price: '3.00'
  },
  {
    name: 'Durian',
    sku: 'D',
    price: '4.00'
  },
  {
    name: 'Elderberry',
    sku: 'E',
    price: '3.00'
  }
]

export const specialPriceCampaign: Partial<Campaigns>[] = [
  {
    name: 'Buy 3 for $2.5',
    type: 'specialPrice',
    requiredProductSku: 'A',
    requiredProductQuantity: 3,
    specialPrice: '2.50',
    isActive: true
  },
  {
    name: 'Buy 2 for $3',
    type: 'specialPrice',
    requiredProductSku: 'B',
    requiredProductQuantity: 2,
    specialPrice: '3.00',
    isActive: true
  },
  {
    name: 'Buy 1 for $2',
    type: 'specialPrice',
    requiredProductSku: 'C',
    requiredProductQuantity: 1,
    specialPrice: '2.00',
    isActive: false
  },

  {
    name: 'Buy 3 for get 1 $1.50 off',
    type: 'dollarOff',
    requiredProductSku: 'D',
    requiredProductQuantity: 3,
    dollarOff: '1.50',
    isActive: true
  },
  {
    name: '50 cent off',
    type: 'dollarOff',
    requiredProductSku: 'E',
    requiredProductQuantity: 0,
    dollarOff: '0.50',
    isActive: true
  }
]

export const init = async (app: Application) => {
  await Promise.all(testProducts.map((product) => app.service('products').create(product)))
  await Promise.all(specialPriceCampaign.map((campaign) => app.service('campaigns').create(campaign)))
}
