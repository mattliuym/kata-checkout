export interface SpecialPriceCampaign {
  id: number
  type: 'specialPrice'
  name: string
  requiredProductSku: string
  requiredProductQuantity: number
  specialPrice: string
}

export interface DollarOffCampaign {
  id: number
  type: 'dollarOff'
  name: string
  requiredProductSku: string
  requiredProductQuantity: number
  targetProductSku: string
  targetProductQuantity: number
  dollarOff: number
}

export interface PercentageOffCampaign {
  id: number
  type: 'percentageOff'
  name: string
  requiredProductSku: string
  requiredProductQuantity: number
  targetProductSku: string
  targetProductQuantity: number
  percentageOff: number
}
