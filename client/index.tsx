import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const queryClient = new QueryClient()
const router = createBrowserRouter(routes)
const onRedirectCallback = (appState: any) => {
  // Redirect to the welcome page after successful login
  router.navigate('/welcomePage')
}
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    /**
     * TODO: replace domain, clientId, and audience
     */
    <Auth0Provider
      domain="dev-dlndszbceh0vaq63.au.auth0.com"
      clientId="Iinvdb3OkUVh4IEEaSNsB9MJa9GcwRdh"
      authorizationParams={{
        audience: 'https://dev-dlndszbceh0vaq63.au.auth0.com/api/v2/',
        redirect_uri: window.location.origin,
        onRedirectCallback: { onRedirectCallback },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
