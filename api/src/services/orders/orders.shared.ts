import type { ClientApplication } from '../../client'
import type {
  Orders,
  OrdersData,
  OrdersParams,
  OrdersPatch,
  OrdersQuery,
  OrdersService
} from './orders.class'

export type { Orders, OrdersData, OrdersPatch, OrdersQuery }

export type OrdersClientService = OrdersService<OrdersParams>

export const ordersPath = 'orders'

export const ordersMethods: Array<keyof OrdersService<OrdersParams>> = [
  'find',
  'get',
  'create',
  'patch',
  'remove',
  'scan'
]

export const ordersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(ordersPath, connection.service(ordersPath), {
    methods: ordersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [ordersPath]: OrdersClientService
  }
}
