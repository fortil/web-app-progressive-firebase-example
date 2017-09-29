importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js')

firebase.initializeApp({
  'messagingSenderId': 'YOUR-SENDER-ID'
})

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  return self.registration.showNotification(payload.data.title, payload.data)
})

