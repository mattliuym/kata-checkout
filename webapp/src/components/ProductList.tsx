import { Box, HStack } from "@chakra-ui/react"
import { ProductsData } from "kata-checkout-api"
import { useProducts } from "../hooks/useProducts"

interface Props {
  products?: ProductsData[]
}

const ProductList: React.FC<Props> = () => {
  const { data } = useProducts()
  console.log("products====>", data)
  return (
    <Box>
      <HStack>
        {data.map(product => (
          <Box key={product.id}>{product.name}</Box>
        ))}
      </HStack>
    </Box>
  )
}

export default ProductList
