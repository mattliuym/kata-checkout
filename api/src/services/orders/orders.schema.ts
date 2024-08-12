// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import type { FromSchema } from '@feathersjs/schema'
import { getValidator, querySyntax, resolve } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { timestampDataSchema } from '../../schemas/timestampsSchema'
import { dataValidator, queryValidator } from '../../validators'
import { LineItems, lineItemsSchema } from '../line-items/line-items.schema'
import type { OrdersService } from './orders.class'

export const status = <const>['scanning', 'completed']

// Main data model schema
export const ordersSchema = {
  $id: 'Orders',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'status'], // todo may need total?
  properties: {
    id: { type: 'number' },
    status: { type: 'string', enum: status },
    total: { type: 'string' },
    ...timestampDataSchema.properties
  }
} as const
export type Orders = FromSchema<typeof ordersSchema>
export const ordersValidator = getValidator(ordersSchema, dataValidator)
export const ordersResolver = resolve<Orders, HookContext<OrdersService>>({})

export const ordersExternalResolver = resolve<Orders, HookContext<OrdersService>>({})

// Schema for creating new data
export const ordersDataSchema = {
  $id: 'OrdersData',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...ordersSchema.properties,
    lineItems: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: [],
        properties: {
          ...lineItemsSchema.properties
        }
      }
    }
  }
} as const
export type OrdersData = FromSchema<typeof ordersDataSchema> & { items: LineItems[] }
export const ordersDataValidator = getValidator(ordersDataSchema, dataValidator)
export const ordersDataResolver = resolve<OrdersData, HookContext<OrdersService>>({
  total: async (value) => {
    // Format the total as a string with currency formatting
    return parseFloat(value ?? '').toFixed(2)
  },
  lineItems: async (_value, order, context) => {
    // Add the line items to the response
    const lineItemsResult = await context.app.service('line-items').find({
      query: {
        orderId: order.id // Assuming `orderId` is the foreign key in `line-items` table
      }
    })
    return lineItemsResult.data
  }
})

// Schema for updating existing data
export const ordersPatchSchema = {
  $id: 'OrdersPatch',
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    ...ordersSchema.properties
  }
} as const

export type OrdersPatch = FromSchema<typeof ordersPatchSchema> & { items: LineItems[] }

export const ordersPatchValidator = getValidator(ordersPatchSchema, dataValidator)
export const ordersPatchResolver = resolve<OrdersPatch, HookContext<OrdersService>>({})

// Schema for allowed query properties
export const ordersQuerySchema = {
  $id: 'OrdersQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(ordersSchema.properties)
  }
} as const
export type OrdersQuery = FromSchema<typeof ordersQuerySchema>
export const ordersQueryValidator = getValidator(ordersQuerySchema, queryValidator)
export const ordersQueryResolver = resolve<OrdersQuery, HookContext<OrdersService>>({})
