import { lineItems } from "./line-items/line-items"
import { campaigns } from "./campaigns/campaigns"
import { orders } from "./orders/orders"
import { products } from "./products/products"
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from "../declarations"

export const services = (app: Application) => {
  app.configure(lineItems)
  app.configure(orders)
  app.configure(campaigns)
  app.configure(products)
  // All services will be registered here
}
