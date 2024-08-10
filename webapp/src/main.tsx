import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ChakraProvider } from "@chakra-ui/react"
import QueryProvider from "./components/QueryProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </ChakraProvider>
  </StrictMode>,
)
