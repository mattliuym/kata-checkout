// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { LineItemsService } from './line-items.class'
import { timestampDataSchema } from '../../schemas/timestampsSchema'

// Main data model schema
export const lineItemsSchema = {
  $id: 'LineItems',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'orderId', 'productSku', 'quantity', 'price', 'discount', 'total'], // todo check if correct?
  properties: {
    id: { type: 'number' },
    orderId: { type: 'number' },
    productSku: { type: 'string' },
    quantity: { type: 'number' },
    price: { type: 'number' },
    discount: { type: 'number' },
    total: { type: 'number' },
    ...timestampDataSchema.properties
  }
} as const
export type LineItems = FromSchema<typeof lineItemsSchema>
export const lineItemsValidator = getValidator(lineItemsSchema, dataValidator)
export const lineItemsResolver = resolve<LineItems, HookContext<LineItemsService>>({})

export const lineItemsExternalResolver = resolve<LineItems, HookContext<LineItemsService>>({})

// Schema for creating new data
export const lineItemsDataSchema = {
  $id: 'LineItemsData',
  type: 'object',
  additionalProperties: false,
  required: ['orderId', 'productSku', 'quantity'],
  properties: {
    ...lineItemsSchema.properties
  }
} as const
export type LineItemsData = FromSchema<typeof lineItemsDataSchema>
export const lineItemsDataValidator = getValidator(lineItemsDataSchema, dataValidator)
export const lineItemsDataResolver = resolve<LineItemsData, HookContext<LineItemsService>>({})

// Schema for updating existing data
export const lineItemsPatchSchema = {
  $id: 'LineItemsPatch',
  type: 'object',
  additionalProperties: false,
  required: ['orderId', 'productSku', 'quantity'],
  properties: {
    ...lineItemsSchema.properties
  }
} as const
export type LineItemsPatch = FromSchema<typeof lineItemsPatchSchema>
export const lineItemsPatchValidator = getValidator(lineItemsPatchSchema, dataValidator)
export const lineItemsPatchResolver = resolve<LineItemsPatch, HookContext<LineItemsService>>({})

// Schema for allowed query properties
export const lineItemsQuerySchema = {
  $id: 'LineItemsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(lineItemsSchema.properties)
  }
} as const
export type LineItemsQuery = FromSchema<typeof lineItemsQuerySchema>
export const lineItemsQueryValidator = getValidator(lineItemsQuerySchema, queryValidator)
export const lineItemsQueryResolver = resolve<LineItemsQuery, HookContext<LineItemsService>>({})
