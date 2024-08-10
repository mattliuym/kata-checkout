import { schema } from '@feathersjs/schema'

export const timestampDataSchema = schema({
  $id: 'TimestampData',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    createdAt: {
      type: 'object'
    },
    updatedAt: {
      type: 'object'
    },
    deletedAt: {
      type: 'object',
      nullable: true
    }
  }
})
