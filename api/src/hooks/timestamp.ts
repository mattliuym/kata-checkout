import { HookContext } from '@feathersjs/feathers'

export const createdAt = async (context: HookContext) => {
  context.data.createdAt = new Date()

  return context
}

export const updatedAt = async (context: HookContext) => {
  context.data.updatedAt = new Date()

  return context
}

export const deletedAt = async (context: HookContext) => {
  context.data.deletedAt = null

  return context
}
