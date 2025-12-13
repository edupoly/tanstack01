import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'


// 1. Define Query Options
const productsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: async () => {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    return data.products as Array<{ id: number; title: string; price: number,thumbnail:string }>
  },
})

// 2. Define Route with Loader
export const Route = createFileRoute('/products/')({
  // The Loader ensures data is fetched before the page loads
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(productsQueryOptions)
  },
  component: ProductsComponent,
})

function ProductsComponent() {
  // 3. Use useSuspenseQuery to read the data
  const { data: products } = useSuspenseQuery(productsQueryOptions)
//   const { data: products } = useQuery(productsQueryOptions)//data may be null//data is guaranteed to be defined

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <li key={p.id} className="border p-4 rounded shadow">
            <Link key={p.id}
            to="/products/$productId"
            params={{ productId: p.id.toString() }}>
            <img src={p.thumbnail} alt="" />
            <div className="font-bold">{p.title}</div>
            <div className="text-green-600">${p.price}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}