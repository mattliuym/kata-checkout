// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { campaignsClient } from './services/campaigns/campaigns.shared'
export type {
  Campaigns,
  CampaignsData,
  CampaignsPatch,
  CampaignsQuery
} from './services/campaigns/campaigns.shared'
export type {
  Products,
  ProductsData,
  ProductsPatch,
  ProductsQuery
} from './services/products/products.shared'

import authenticationClient from '@feathersjs/authentication-client'
import type { Application, TransportConnection } from '@feathersjs/feathers'
import { feathers } from '@feathersjs/feathers'

import { CampaignsService } from './services/campaigns/campaigns.class'
import { ProductsService } from './services/products/products.class'
import { productsClient } from './services/products/products.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {
  products: ProductsService
  campaigns: CampaignsService
}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(productsClient)
  client.configure(campaignsClient)
  return client
}
