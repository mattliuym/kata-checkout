// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import type { FromSchema } from '@feathersjs/schema'
import { getValidator, querySyntax, resolve } from '@feathersjs/schema'
import type { HookContext } from '../../declarations'
import { timestampDataSchema } from '../../schemas/timestampsSchema'
import { dataValidator, queryValidator } from '../../validators'
import type { CampaignsService } from './campaigns.class'

// Main data model schema
export const campaignsSchema = {
  $id: 'Campaigns',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'name', 'type'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    type: { type: 'string' },
    requiredProductSku: { type: 'string' },
    requiredProductQuantity: { type: 'number' },
    targetProductSku: { type: 'string' },
    targetProductQuantity: { type: 'number' },
    specialPrice: { type: 'number' },
    amountOff: { type: 'number' },
    percentageOff: { type: 'number' },
    isActive: { type: 'boolean' },
    ...timestampDataSchema.properties
  }
} as const
export type Campaigns = FromSchema<typeof campaignsSchema>
export const campaignsValidator = getValidator(campaignsSchema, dataValidator)
export const campaignsResolver = resolve<Campaigns, HookContext<CampaignsService>>({})

export const campaignsExternalResolver = resolve<Campaigns, HookContext<CampaignsService>>({})

// Schema for creating new data
export const campaignsDataSchema = {
  $id: 'CampaignsData',
  type: 'object',
  additionalProperties: false,
  required: ['name', 'type'],
  properties: {
    ...campaignsSchema.properties
  }
} as const
export type CampaignsData = FromSchema<typeof campaignsDataSchema>
export const campaignsDataValidator = getValidator(campaignsDataSchema, dataValidator)
export const campaignsDataResolver = resolve<CampaignsData, HookContext<CampaignsService>>({})

// Schema for updating existing data
export const campaignsPatchSchema = {
  $id: 'CampaignsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...campaignsSchema.properties
  }
} as const
export type CampaignsPatch = FromSchema<typeof campaignsPatchSchema>
export const campaignsPatchValidator = getValidator(campaignsPatchSchema, dataValidator)
export const campaignsPatchResolver = resolve<CampaignsPatch, HookContext<CampaignsService>>({})

// Schema for allowed query properties
export const campaignsQuerySchema = {
  $id: 'CampaignsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(campaignsSchema.properties)
  }
} as const
export type CampaignsQuery = FromSchema<typeof campaignsQuerySchema>
export const campaignsQueryValidator = getValidator(campaignsQuerySchema, queryValidator)
export const campaignsQueryResolver = resolve<CampaignsQuery, HookContext<CampaignsService>>({})
