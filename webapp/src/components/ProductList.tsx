import { Box, Button, HStack, VStack } from "@chakra-ui/react"
import { Orders } from "kata-checkout-api"
import { useProducts } from "../hooks/useProducts"
import { useScan } from "../hooks/useScan"
import { client } from "../services/feathers"
import OrderDetails from "./OrderDetails"

interface Props {
  order: Orders
  setOrder: React.Dispatch<React.SetStateAction<Orders | undefined>>
}

const ProductList: React.FC<Props> = ({ order, setOrder }) => {
  const { data, isLoading } = useProducts()

  const { mutateAsync: scan } = useScan(order.id)

  if (isLoading) {
    return <Box>Loading...</Box>
  }

  if (order?.status === "completed") {
    return <Box>Order is completed</Box>
  }

  const handleScanItem = async (sku: string) => {
    const orderResult = await scan(sku)

    setOrder(orderResult)
  }
  const handleCompleteOrder = async () => {
    const orderResult = await client
      .service("orders")
      .patch(order.id, { status: "completed" })

    if (order) {
      setOrder(orderResult)
    }
  }

  return (
    <VStack bg="white" spacing={12}>
      <HStack>
        {data!.data.map(product => (
          <Button key={product.id} onClick={() => handleScanItem(product.sku)}>
            {product.name}
          </Button>
        ))}
      </HStack>

      <Box>Order Details</Box>
      <Button onClick={handleCompleteOrder}>Complete Order</Button>
      <OrderDetails order={order} />
    </VStack>
  )
}

export default ProductList
