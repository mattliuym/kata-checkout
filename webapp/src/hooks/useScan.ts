import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "../services/feathers"

export const useScan = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sku: string) =>
      client.service("orders").scan({ id, productSku: sku }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["*"] })
    },
  })
}
