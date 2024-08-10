import { Box, Button } from "@chakra-ui/react"
import "./App.css"
import { client } from "./services/feathers"
import ProductList from "./components/ProductList"

interface Props {}

const App: React.FC<Props> = () => {
  const clickButton = async () => {
    const result = await client.service("products").get(1)
    console.log("result==>", result)
  }
  return (
    <Box>
      <Button onClick={clickButton}>Click me</Button>
      <ProductList />
    </Box>
  )
}

export default App
