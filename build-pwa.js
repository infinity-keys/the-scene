const { generateSW } = require('workbox-build')
console.log('pwa')
generateSW({
  // Avoid cache busting for assets that already include a hash in their filename
  dontCacheBustURLsMatching: /\.\w{8}\./,

  // The folder containing your built RedwoodJS web side
  globDirectory: 'web/dist',

  // Cache JavaScript, CSS, and HTML assets
  globPatterns: ['**/*.{js,json,png,md,txt,tsx,css,html,ts}'],

  // Adjust to your needs. This is the maximum file size Workbox will cache.
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB

  // Use this URL as a fallback when the user is offline
  navigateFallback: '/index.html',

  // Define runtime caching strategies
  runtimeCaching: [
    {
      urlPattern: ({ request, url }) => {
        // Custom logic to determine whether to use cache-first or network-first, etc.
        return url.pathname.startsWith('/api/')
      },
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
        },
      },
    },
    // Add more runtime caching rules here
  ],

  // Skip the waiting phase to immediately activate the new service worker
  skipWaiting: true,

  // The location to write the generated service worker file
  swDest: 'web/dist/sw.js',
}).then(({ count, size, warnings }) => {
  if (warnings.length > 0) {
    console.warn(
      'Warnings encountered while generating a service worker:',
      warnings.join('\n')
    )
  }

  console.log(
    `Generated a service worker, which will precache ${count} files, totaling ${size} bytes.`
  )
})
