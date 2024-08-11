// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from "@feathersjs/schema"

import {
  lineItemsDataValidator,
  lineItemsPatchValidator,
  lineItemsQueryValidator,
  lineItemsResolver,
  lineItemsExternalResolver,
  lineItemsDataResolver,
  lineItemsPatchResolver,
  lineItemsQueryResolver,
} from "./line-items.schema"

import type { Application } from "../../declarations"
import { LineItemsService, getOptions } from "./line-items.class"
import { lineItemsPath, lineItemsMethods } from "./line-items.shared"

export * from "./line-items.class"
export * from "./line-items.schema"

// A configure function that registers the service and its hooks via `app.configure`
export const lineItems = (app: Application) => {
  // Register our service on the Feathers application
  app.use(lineItemsPath, new LineItemsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: lineItemsMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service(lineItemsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(lineItemsExternalResolver),
        schemaHooks.resolveResult(lineItemsResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(lineItemsQueryValidator),
        schemaHooks.resolveQuery(lineItemsQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(lineItemsDataValidator),
        schemaHooks.resolveData(lineItemsDataResolver),
      ],
      patch: [
        schemaHooks.validateData(lineItemsPatchValidator),
        schemaHooks.resolveData(lineItemsPatchResolver),
      ],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  })
}

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    [lineItemsPath]: LineItemsService
  }
}
