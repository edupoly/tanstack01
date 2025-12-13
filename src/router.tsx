import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createTanStackRouter({
    routeTree,
    context:{
      queryClient
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}
// 3. Type safety for the router context
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}