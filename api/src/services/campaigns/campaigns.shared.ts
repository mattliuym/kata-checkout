// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from "@feathersjs/feathers"
import type { ClientApplication } from "../../client"
import type {
  Campaigns,
  CampaignsData,
  CampaignsPatch,
  CampaignsQuery,
  CampaignsService,
} from "./campaigns.class"

export type { Campaigns, CampaignsData, CampaignsPatch, CampaignsQuery }

export type CampaignsClientService = Pick<
  CampaignsService<Params<CampaignsQuery>>,
  (typeof campaignsMethods)[number]
>

export const campaignsPath = "campaigns"

export const campaignsMethods: Array<keyof CampaignsService> = [
  "find",
  "get",
  "create",
  "patch",
  "remove",
]

export const campaignsClient = (client: ClientApplication) => {
  const connection = client.get("connection")

  client.use(campaignsPath, connection.service(campaignsPath), {
    methods: campaignsMethods,
  })
}

// Add this service to the client service type index
declare module "../../client" {
  interface ServiceTypes {
    [campaignsPath]: CampaignsClientService
  }
}
