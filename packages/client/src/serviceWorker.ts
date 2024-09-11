export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./src/sw.js')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        })
        .catch((error: string) => {
          console.log('ServiceWorker registration failed: ', error)
        })
    })
  }
}
