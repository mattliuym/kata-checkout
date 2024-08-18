import { SpecialPrice } from './orders.types'

export const CalculateSpecialPrice = (params: SpecialPrice): string => {
  const { quantity, price, campaign } = params

  const fullSets = Math.floor(quantity / campaign.requiredProductQuantity!)
  const remainder = quantity % campaign.requiredProductQuantity!
  const specialPrice = parseFloat(campaign.specialPrice!)
  const regularPrice = parseFloat(price)

  return (fullSets * specialPrice + remainder * regularPrice).toFixed(2)
}
