// Versión para cambiar el caché
var version = 'v1.0.1-a'
// Se importa la aplicación (core) de firebase
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js')
// Se importa la herramienta de mensajeria de firebase
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js')
// Se importa nuestra key de firebase
importScripts('./keyfirebase.js')
// Inicializar la aplicación de firebase
firebase.initializeApp(firebaseKey)
// Inicializo la mensajería
var messaging = firebase.messaging()
// Función para recibir los mensajes en background
var ULRend = 'www.williampenagos.com'
messaging.setBackgroundMessageHandler(function (payload) {
  var notificationTitle = payload.data.title
  var notificationOptions = {
    body: JSON.stringify(payload.data.body, null, 2), // payload.data.body,
    icon: payload.data.icon,
    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
  }
  ULRend = payload.data.click_action
  return self.registration.showNotification(notificationTitle, notificationOptions)
})


/* 
Eventos para el caché, trabajo más rápido con archivos
*/

self.addEventListener("install", function (event) {
  // Caché
  event.waitUntil(
    caches.open(version).then(function(cache) {
        return cache.addAll([
          '/',
          '/css/styles.css',
          '/js/index.js'
        ]);
      })
      .then(function() {
      })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(version).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request)/* .then(function(response) {
          cache.put(event.request, response.clone())
          return response
        }) */
      })
    })
  )
})
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})