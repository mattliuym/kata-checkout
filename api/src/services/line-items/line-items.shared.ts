// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from "@feathersjs/feathers"
import type { ClientApplication } from "../../client"
import type {
  LineItems,
  LineItemsData,
  LineItemsPatch,
  LineItemsQuery,
  LineItemsService,
} from "./line-items.class"

export type { LineItems, LineItemsData, LineItemsPatch, LineItemsQuery }

export type LineItemsClientService = Pick<
  LineItemsService<Params<LineItemsQuery>>,
  (typeof lineItemsMethods)[number]
>

export const lineItemsPath = "line-items"

export const lineItemsMethods: Array<keyof LineItemsService> = [
  "find",
  "get",
  "create",
  "patch",
  "remove",
]

export const lineItemsClient = (client: ClientApplication) => {
  const connection = client.get("connection")

  client.use(lineItemsPath, connection.service(lineItemsPath), {
    methods: lineItemsMethods,
  })
}

// Add this service to the client service type index
declare module "../../client" {
  interface ServiceTypes {
    [lineItemsPath]: LineItemsClientService
  }
}
