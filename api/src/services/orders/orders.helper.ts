import { SpecialPrice } from './orders.types'

export const CalculateSpecialPrice = (params: SpecialPrice): string => {
  const { requiredQuantity = 1, currentQuantity } = params

  const productPrice = parseFloat(params.productPrice)
  const specialPrice = parseFloat(`${params.specialPrice ?? productPrice * requiredQuantity}`)

  const remainder = currentQuantity % requiredQuantity
  const fullSets = Math.floor(params.currentQuantity / requiredQuantity)
  const newTotal = (fullSets * specialPrice + remainder * productPrice).toFixed(2)

  return newTotal
}
