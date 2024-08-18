import { Button, VStack } from "@chakra-ui/react"
import { Orders } from "kata-checkout-api"
import { useState } from "react"
import "./App.css"
import ProductList from "./components/ProductList"
import { client } from "./services/feathers"

interface Props {}

const App: React.FC<Props> = () => {
  const [order, setOrder] = useState<Orders>()

  const clickButton = async () => {
    const newOrder = await client.service("orders").create({})

    setOrder(newOrder)
  }

  return (
    <VStack spacing={12}>
      <Button onClick={clickButton}>Start Scan</Button>
      {order && <ProductList order={order} setOrder={setOrder} />}
    </VStack>
  )
}

export default App
