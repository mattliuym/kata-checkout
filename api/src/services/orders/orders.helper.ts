import { DollarOff, SpecialPrice } from './orders.types'

export const calculateSpecialPrice = (params: SpecialPrice): string => {
  const { quantity, price, campaign } = params

  const fullSets = Math.floor(quantity / campaign.requiredProductQuantity)
  const remainder = quantity % campaign.requiredProductQuantity
  const specialPrice = parseFloat(campaign.specialPrice!)
  const regularPrice = parseFloat(price)

  return (fullSets * specialPrice + remainder * regularPrice).toFixed(2)
}

export const calculateDollarOff = (params: DollarOff): string => {
  const { quantity, price, campaign } = params
  const discountedPrice = Math.max(parseFloat(price) - parseFloat(campaign.dollarOff), 0)

  if (!campaign.requiredProductQuantity) {
    return (quantity * discountedPrice).toFixed(2)
  }

  const fullSets = Math.floor(quantity / (campaign.requiredProductQuantity + 1))
  const remainder = quantity % (campaign.requiredProductQuantity + 1)

  const setsTotal = fullSets * (discountedPrice + parseFloat(price) * campaign.requiredProductQuantity)
  const remainderTotal = remainder * parseFloat(price)

  return (setsTotal + remainderTotal).toFixed(2)
}
