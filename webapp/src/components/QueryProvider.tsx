import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import React from "react"

interface Props {
  children: React.ReactNode
}

const QueryProvider: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: error => {
        console.log(error.message)
      },
    }),
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
