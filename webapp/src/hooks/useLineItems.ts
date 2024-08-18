import { useQuery } from "@tanstack/react-query"
import { client } from "../services/feathers"

export const useLineItems = (orderId: number) => {
  return useQuery({
    queryKey: ["lineItems"],
    queryFn: () =>
      client.service("line-items").find({
        query: {
          orderId,
        },
      }),
  })
}
