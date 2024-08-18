import { Campaigns } from '../campaigns/campaigns.schema'
import { DollarOffCampaign, PercentageOffCampaign, SpecialPriceCampaign } from '../campaigns/campaigns.types'

export interface ScanPayload {
  id: number
  productSku: string
}

export interface CalculateCampaign {
  quantity: number
  price: string
  campaign: Campaigns | null
}

export interface SpecialPrice {
  quantity: number
  price: string
  campaign: SpecialPriceCampaign
}

// todo: TBC
export interface DollarOff {
  quantity: number
  price: string
  campaign: DollarOffCampaign
}

export interface PercentageOff {
  quantity: number
  price: string
  campaign: PercentageOffCampaign
}
