import { hydrateRoot, createRoot } from 'react-dom/client'

import App from './App'
/**
 * When `#redwood-app` isn't empty then it's very likely that you're using
 * prerendering. So React attaches event listeners to the existing markup
 * rather than replacing it.
 * https://reactjs.org/docs/react-dom-client.html#hydrateroot
 */
const redwoodAppElement = document.getElementById('redwood-app')

if (redwoodAppElement.children?.length > 0) {
  hydrateRoot(redwoodAppElement, <App />)
} else {
  const root = createRoot(redwoodAppElement)
  root.render(<App />)
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('Service Worker registered with scope:', registration.scope)
      },
      (err) => {
        console.error('Service Worker registration failed:', err)
      }
    )
  })
}
