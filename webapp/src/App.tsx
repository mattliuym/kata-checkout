import { Box, Button } from "@chakra-ui/react"
import "./App.css"

interface Props {}

const App: React.FC<Props> = () => {
  const clickButton = () => {
    console.log("111!!!")
  }
  return (
    <Box>
      <Button onClick={clickButton}>Click me</Button>
    </Box>
  )
}

export default App
