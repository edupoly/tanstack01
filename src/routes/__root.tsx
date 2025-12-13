import { HeadContent, Scripts, createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import appCss from '../styles.css?url'

import Header from '../components/Header'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component:RootComponent
  // shellComponent: RootDocument,
})

function RootComponent({ children }: { children: React.ReactNode }) {
  // 2. Access the queryClient from the route context
  const { queryClient } = Route.useRouteContext()

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          {/* 3. YOUR NAVIGATION LINKS */}
          <div className="p-4 flex gap-4 border-b bg-gray-100">
            <Link to="/" className="[&.active]:font-bold [&.active]:text-blue-600">
              Home
            </Link>
            <Link to="/counter" className="[&.active]:font-bold [&.active]:text-blue-600">
              Counter
            </Link>
            <Link to="/products" className="[&.active]:font-bold [&.active]:text-blue-600">
              Products
            </Link>
          </div>

          <div className="p-4">
            <Outlet />
          </div>

          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[{ name: 'Router', render: <TanStackRouterDevtoolsPanel /> }]}
          />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  )
}
