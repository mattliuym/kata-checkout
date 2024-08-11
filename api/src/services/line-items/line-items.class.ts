// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from "@feathersjs/feathers"
import { KnexService } from "@feathersjs/knex"
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex"

import type { Application } from "../../declarations"
import type {
  LineItems,
  LineItemsData,
  LineItemsPatch,
  LineItemsQuery,
} from "./line-items.schema"

export type { LineItems, LineItemsData, LineItemsPatch, LineItemsQuery }

export interface LineItemsParams extends KnexAdapterParams<LineItemsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class LineItemsService<
  ServiceParams extends Params = LineItemsParams,
> extends KnexService<
  LineItems,
  LineItemsData,
  LineItemsParams,
  LineItemsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get("paginate"),
    Model: app.get("mysqlClient"),
    name: "line-items",
  }
}
