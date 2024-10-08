// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from "@feathersjs/schema"

import {
  campaignsDataValidator,
  campaignsPatchValidator,
  campaignsQueryValidator,
  campaignsResolver,
  campaignsExternalResolver,
  campaignsDataResolver,
  campaignsPatchResolver,
  campaignsQueryResolver,
} from "./campaigns.schema"

import type { Application } from "../../declarations"
import { CampaignsService, getOptions } from "./campaigns.class"
import { campaignsPath, campaignsMethods } from "./campaigns.shared"

export * from "./campaigns.class"
export * from "./campaigns.schema"

// A configure function that registers the service and its hooks via `app.configure`
export const campaigns = (app: Application) => {
  // Register our service on the Feathers application
  app.use(campaignsPath, new CampaignsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: campaignsMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service(campaignsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(campaignsExternalResolver),
        schemaHooks.resolveResult(campaignsResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(campaignsQueryValidator),
        schemaHooks.resolveQuery(campaignsQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(campaignsDataValidator),
        schemaHooks.resolveData(campaignsDataResolver),
      ],
      patch: [
        schemaHooks.validateData(campaignsPatchValidator),
        schemaHooks.resolveData(campaignsPatchResolver),
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
    [campaignsPath]: CampaignsService
  }
}
