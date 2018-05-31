// if you send a push notification from server, it might be instant or delay up 10 minutes
// https://developer.mozilla.org/en-US/docs/Web/API/PushEvent
self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.')
  // push notification can send event.data.json() as well
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)

  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
  const title = 'MyApp Alert'
  const options = {
    body: event.data.text(),
    icon: '/static/img/favicon-196.png',
    badge: '/static/img/favicon-96.png',
    tag: 'alert'
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function (event) {
  // can handle different type of notification based on event.notification.tag
  console.log(`[Service Worker] Notification click Received: ${event.notification.tag}`)

  event.notification.close()
})
