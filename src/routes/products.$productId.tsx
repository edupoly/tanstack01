import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

// 1. Define Query Options for a SINGLE product
// We pass the 'productId' into the function to create a unique key
const productQueryOptions = (productId: string) => queryOptions({
  queryKey: ['products', productId],
  queryFn: async () => {
    const res = await fetch(`https://dummyjson.com/products/${productId}`)
    return res.json()
  },
})

// 2. Define the Route
export const Route = createFileRoute('/products/$productId')({
  // The 'loader' receives 'params', which contains our productId
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(productQueryOptions(params.productId))
  },
  component: ProductDetailComponent,
})

function ProductDetailComponent() {
  // Get the productId from the route params
  const { productId } = Route.useParams()
  // Fetch the data
  const { data: product } = useSuspenseQuery(productQueryOptions(productId))

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to="/products" className="text-blue-500 hover:underline mb-4 block">
        ← Back to Products
      </Link>
      
      <div className="border rounded-lg overflow-hidden shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full md:w-1/2 object-cover rounded"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-500 mb-4">{product.brand} - {product.category}</p>
            <div className="text-2xl text-green-600 font-bold mb-4">
              ${product.price}
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}