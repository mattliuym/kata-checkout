// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ProductsService } from './products.class'

// Main data model schema
export const productsSchema = {
  $id: 'Products',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },

    text: { type: 'string' }
  }
} as const
export type Products = FromSchema<typeof productsSchema>
export const productsValidator = getValidator(productsSchema, dataValidator)
export const productsResolver = resolve<Products, HookContext<ProductsService>>({})

export const productsExternalResolver = resolve<Products, HookContext<ProductsService>>({})

// Schema for creating new data
export const productsDataSchema = {
  $id: 'ProductsData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...productsSchema.properties
  }
} as const
export type ProductsData = FromSchema<typeof productsDataSchema>
export const productsDataValidator = getValidator(productsDataSchema, dataValidator)
export const productsDataResolver = resolve<ProductsData, HookContext<ProductsService>>({})

// Schema for updating existing data
export const productsPatchSchema = {
  $id: 'ProductsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...productsSchema.properties
  }
} as const
export type ProductsPatch = FromSchema<typeof productsPatchSchema>
export const productsPatchValidator = getValidator(productsPatchSchema, dataValidator)
export const productsPatchResolver = resolve<ProductsPatch, HookContext<ProductsService>>({})

// Schema for allowed query properties
export const productsQuerySchema = {
  $id: 'ProductsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(productsSchema.properties)
  }
} as const
export type ProductsQuery = FromSchema<typeof productsQuerySchema>
export const productsQueryValidator = getValidator(productsQuerySchema, queryValidator)
export const productsQueryResolver = resolve<ProductsQuery, HookContext<ProductsService>>({})
