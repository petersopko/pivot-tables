/**
 * Raw data structure from the API
 */
export type RawDataItem = {
  product: string
  pcs: number
  category: string
  store: string
}

/**
 * Product data structure for pivot table
 */
export type ProductPivot = {
  name: string
  storeData: Record<string, number>
  total: number
}

/**
 * Category data structure for pivot table
 */
export type CategoryPivot = {
  name: string
  expanded: boolean
  storeData: Record<string, number>
  total: number
  products: ProductPivot[]
}

/**
 * Sort direction type
 */
export type SortDirection = 'asc' | 'desc'
