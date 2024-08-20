import { Campaigns } from '../campaigns/campaigns'
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

export interface SpecialPrice extends CalculateCampaign {
  campaign: SpecialPriceCampaign
}

export interface DollarOff extends CalculateCampaign {
  campaign: DollarOffCampaign
}

export interface PercentageOff extends CalculateCampaign {
  campaign: PercentageOffCampaign
}
