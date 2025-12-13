import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Welcome Home!</h2>
      <p>Click the links above to navigate.</p>
    </div>
  )
}