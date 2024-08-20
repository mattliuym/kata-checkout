import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { Orders } from "kata-checkout-api"

interface Props {
  order?: Orders
}

const OrderDetails: React.FC<Props> = ({ order }) => {
  if (!order) {
    return <Box>Loading...</Box>
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {order?.lineItems?.map(lineItem => (
            <Tr key={lineItem.id}>
              <Td>{lineItem.productSku}</Td>
              <Td isNumeric>{lineItem.quantity}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Th isNumeric>{order.total}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default OrderDetails
