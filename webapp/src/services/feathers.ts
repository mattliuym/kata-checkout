import { rest } from "@feathersjs/client"
import axios from "axios"
import { createClient, ServiceTypes } from "kata-checkout-api"

const restClient = rest("http://localhost:3030")
const axiosClient = restClient.axios(axios)

export const client = createClient(axiosClient)
export type AvailableServiceTypes = keyof ServiceTypes & string

export interface PaginatedResult<T> {
  data: T[]
  limit: number
  skip: number
  total: number
}
