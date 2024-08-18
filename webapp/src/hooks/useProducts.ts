import { useQuery } from "@tanstack/react-query"
import { client } from "../services/feathers"

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => client.service("products").find({}),
  })
}
