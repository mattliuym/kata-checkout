import { useQuery } from "@tanstack/react-query"
import { client, PaginatedResult } from "../services/feathers"
import { ProductsData } from "kata-checkout-api"

export const useProducts = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => client.service("products").find({}),
  })

  return data as PaginatedResult<ProductsData>
}
