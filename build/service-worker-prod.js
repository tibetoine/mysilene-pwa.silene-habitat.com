;(function () {
  'use strict'

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors.
  var isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  )

  window.addEventListener('load', function () {
    if (
      'serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)
    ) {
      navigator.serviceWorker
        .register('OneSignalSDKWorker.js')
        .then(function (registration) {
          console.log('#1 - flag registration')

          if (registration.waiting) {
            // a new version is already waiting to take control
            // this.newWorker = registration.waiting
            /*
            code omitted: displays a snackbar to the user to manually trigger
            activation of the new SW. This will be done by calling skipWaiting()
            then reloading the page
          */
            console.log('#2 - registration.waiting')
          }

          // updatefound is fired if service-worker.js changes.
          registration.onupdatefound = function () {
            console.log('#3 - registration.onupdatefound')
            // updatefound is also fired the very first time the SW is installed,
            // and there's no need to prompt for a reload at that point.
            // So check here to see if the page is already controlled,
            // i.e. whether there's an existing service worker.
            if (navigator.serviceWorker.controller) {
              // The updatefound event implies that registration.installing is set
              var installingWorker = registration.installing

              installingWorker.onstatechange = function () {
                switch (installingWorker.state) {
                  case 'installed':
                    console.log('#4 - installed')
                    // At this point, the old content will have been purged and the
                    // fresh content will have been added to the cache.
                    // It's the perfect time to display a "New content is
                    // available; please refresh." message in the page's interface.
                    
                    // Ajouté le 08/04/2020 par Antoine. Pour etre sûr que l'app se reload sur IPhone (pas pu tester par contre)

                    // Enlevé par ANtoine le 20/05 car l'application se rechargeait toutes les 5 secondes pour uen raison inconnue (peut etre à cose de OneSignal)
                    // window.location.reload();
                    break

                  case 'redundant':
                    throw new Error(
                      'The installing ' + 'service worker became redundant.'
                    )

                  default:
                  // Ignore
                }
              }
            }
          }
        })
        .catch(function (e) {
          console.error('Error during service worker registration:', e)
        })
    }
  })
})()
