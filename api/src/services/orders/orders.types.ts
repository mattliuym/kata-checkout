export interface ScanPayload {
  productSku: string
}

export interface SpecialPrice {
  productPrice: string
  currentQuantity: number
  requiredQuantity?: number
  specialPrice?: string
}
