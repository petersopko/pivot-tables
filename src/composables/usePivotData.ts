import { ref, computed } from 'vue'
import type { RawDataItem, CategoryPivot, SortDirection } from '../types'

/**
 * Composable for managing pivot table data, sorting, and interactions
 */
export const usePivotData = () => {
  const rawData = ref<RawDataItem[]>([])
  const storeNames = ref<string[]>([])
  const categories = ref<CategoryPivot[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const sortStore = ref<string | null>(null)
  const sortDirection = ref<SortDirection>('asc')

  /**
   * Fetch data from API and transform into pivot structure
   */
  const fetchData = async (url: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = (await response.json()) as RawDataItem[]
      rawData.value = data

      // Extract unique store names
      const storesSet = new Set<string>()
      data.forEach((item) => {
        storesSet.add(item.store)
      })
      storeNames.value = [...storesSet].sort()

      // Transform data into pivot structure
      transformData(data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Error fetching data:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Transform raw data into pivot structure
   */
  const transformData = (data: RawDataItem[]) => {
    const categoryMap = new Map<string, CategoryPivot>()

    data.forEach(({ category, product, pcs, store }) => {
      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          expanded: false,
          storeData: {},
          total: 0,
          products: [],
        })
      }

      const catObj = categoryMap.get(category)!

      // Update or create product
      let productObj = catObj.products.find((p) => p.name === product)
      if (!productObj) {
        productObj = {
          name: product,
          storeData: {},
          total: 0,
        }
        catObj.products.push(productObj)
      }

      // Accumulate pcs into product store data
      productObj.storeData[store] = (productObj.storeData[store] || 0) + pcs
      productObj.total += pcs

      // Accumulate pcs into category store data
      catObj.storeData[store] = (catObj.storeData[store] || 0) + pcs
      catObj.total += pcs
    })

    categories.value = [...categoryMap.values()].sort((a, b) => a.name.localeCompare(b.name))
  }

  /**
   * Toggle category expand/collapse
   */
  const toggleCategory = (category: CategoryPivot) => {
    category.expanded = !category.expanded
  }

  /**
   * Toggle sort by store column
   */
  const toggleSort = (storeName: string) => {
    if (sortStore.value === storeName) {
      // Toggle direction if same store is clicked
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      // Start sorting by new store in ascending order
      sortStore.value = storeName
      sortDirection.value = 'asc'
    }
  }

  /**
   * Reset sorting
   */
  const resetSort = () => {
    sortStore.value = null
    sortDirection.value = 'asc'
  }

  /**
   * Computed - sorts categories by the chosen store column
   */
  const sortedCategories = computed(() => {
    if (!sortStore.value) {
      return categories.value
    }
    return [...categories.value].sort((a, b) => {
      const av = a.storeData[sortStore.value!] || 0
      const bv = b.storeData[sortStore.value!] || 0
      return sortDirection.value === 'asc' ? av - bv : bv - av
    })
  })

  /**
   * Return sorted products for a given category, if we are sorting by a store
   */
  const getSortedProducts = (category: CategoryPivot) => {
    if (!sortStore.value) return category.products
    return [...category.products].sort((a, b) => {
      const av = a.storeData[sortStore.value!] || 0
      const bv = b.storeData[sortStore.value!] || 0
      return sortDirection.value === 'asc' ? av - bv : bv - av
    })
  }

  return {
    rawData,
    storeNames,
    categories,
    isLoading,
    error,
    sortStore,
    sortDirection,
    sortedCategories,
    fetchData,
    toggleCategory,
    toggleSort,
    resetSort,
    getSortedProducts,
  }
}
