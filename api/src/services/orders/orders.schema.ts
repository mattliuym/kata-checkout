// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import type { FromSchema } from '@feathersjs/schema'
import { getValidator, querySyntax, resolve } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { OrdersService } from './orders.class'
import { timestampDataSchema } from '../../schemas/timestampsSchema'

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
    total: { type: 'number' },
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
    ...ordersSchema.properties
  }
} as const
export type OrdersData = FromSchema<typeof ordersDataSchema>
export const ordersDataValidator = getValidator(ordersDataSchema, dataValidator)
export const ordersDataResolver = resolve<OrdersData, HookContext<OrdersService>>({})

// Schema for updating existing data
export const ordersPatchSchema = {
  $id: 'OrdersPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...ordersSchema.properties
  }
} as const
export type OrdersPatch = FromSchema<typeof ordersPatchSchema>
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
