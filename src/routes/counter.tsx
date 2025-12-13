import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/counter')({
  component: CounterComponent,
})

function CounterComponent() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Counter</h2>
      <div className="flex items-center gap-4">
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <span className="text-xl font-bold">{count}</span>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  )
}