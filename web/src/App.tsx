import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'
import { Toaster } from '@redwoodjs/web/toast'

import { AuthProvider, useAuth } from './auth'
import { MapDataProvider } from './providers/mapData'

import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          <MapDataProvider>
            <Routes />
            <Toaster
              toastOptions={{
                position: 'bottom-right',
                className:
                  'bg-neutral-750 text-white border border-neutral-500',
                error: {
                  className: 'border border-accent bg-neutral-750 text-white',
                },
              }}
            />
          </MapDataProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
