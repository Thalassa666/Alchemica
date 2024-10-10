const CACHE_NAME = 'alc-cache-v1'

const URLS = ['/', '/index.html']

async function getFilesFromManifest() {
  try {
    const manifestUrl = '/manifest.json'
    const manifestResponse = await fetch(manifestUrl)

    if (!manifestResponse.ok) {
      console.warn('Manifest not found')
      return []
    }

    const manifest = await manifestResponse.json()

    return manifest.assets || Object.values(manifest).map(entry => entry.file)
  } catch (error) {
    console.error('Failed to fetch manifest:', error)
    return []
  }
}

self.addEventListener('install', async event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      console.log('Opened cache')
      const filesFromManifest = await getFilesFromManifest()
      const allUrlsToCache = [...URLS, ...filesFromManifest]

      await cache.addAll(allUrlsToCache)
    })()
  )
})

self.addEventListener('fetch', async event => {
  event.respondWith(
    (async () => {
      const { request } = event

      if (request.url.startsWith('chrome-extension')) {
        return fetch(request)
      } else {
        try {
          const response = await caches.match(request)
          if (response) {
            return response
          }
          const fetchRequest = request.clone()
          const networkResponse = await fetch(fetchRequest)
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse
          }
          const cache = await caches.open(CACHE_NAME)
          cache.put(request, networkResponse.clone())
          return networkResponse
        } catch (error) {
          console.error('Fetch failed:', error)
        }
      }
    })()
  )
})

self.addEventListener('activate', async event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      const deletePromises = cacheNames
        .filter(cacheName => cacheName !== CACHE_NAME)
        .map(async cacheName => {
          await caches.delete(cacheName)
        })
      await Promise.all(deletePromises)
    })()
  )
})
