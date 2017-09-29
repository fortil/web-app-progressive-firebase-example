var messaging = firebase.messaging()
var database = firebase.database()

function getToken() {
  // Función para obtener el token actual
  messaging.getToken()
  .then((currentToken) => {
    if (currentToken) {
      database.ref('/navigators/' + IdNavigator).set(payload)
    }
  })
}

// Función para saber cuando el token cambia
messaging.onTokenRefresh(() => {
  getToken()
})

messaging.requestPermission()
  .then(() => {
    getToken()
  })

messaging.onMessage(function(payload) {
  return self.registration.showNotification(payload.data.title, payload.data)
})