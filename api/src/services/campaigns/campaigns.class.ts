// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from "@feathersjs/feathers"
import { KnexService } from "@feathersjs/knex"
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex"

import type { Application } from "../../declarations"
import type {
  Campaigns,
  CampaignsData,
  CampaignsPatch,
  CampaignsQuery,
} from "./campaigns.schema"

export type { Campaigns, CampaignsData, CampaignsPatch, CampaignsQuery }

export interface CampaignsParams extends KnexAdapterParams<CampaignsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CampaignsService<
  ServiceParams extends Params = CampaignsParams,
> extends KnexService<
  Campaigns,
  CampaignsData,
  CampaignsParams,
  CampaignsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get("paginate"),
    Model: app.get("mysqlClient"),
    name: "campaigns",
  }
}
