var TOKEN
window['IDNavigator'] = navigator.userAgent.replace(/(\s|\.|#|\$|\\|\[|\]|\(|\)|\/|;|,|:|\?|\*|&|\+|!|¡|\?)/g, '_')
firebase.initializeApp(firebaseKey)

var messaging = firebase.messaging()
var database = firebase.database()
var messageNotification = null

// Cuando termine la carga
window.addEventListener('load', () => {
  // Obtiene los objetos de la barra para pedir las notificaciones y el botón para ver las notificaciones
  messageNotification = document.querySelector('.large-row-suscription')
  buttonShowNotifications = document.querySelector('#view-source')
  
  // Alerta si se refresta el token
  messaging.onTokenRefresh(() => {
    messaging.getToken()
      .then((currentToken) => {
        TOKEN = currentToken
        sendTokenToServer(currentToken)
      })
  })
  // Queda a la escucha de mensajes
  messaging.onMessage((payload) => {
    notificationsForeground(payload)
  })

  // Cuando da click en la bara superior
  messageNotification.addEventListener('click', () => {
    getPermission()
  })
  buttonShowNotifications.addEventListener('click', () => {
    if (TOKEN) {
      sendCountToServer()
    }
  })
  
  // // Inicia por primeravez "DETECTA" SI TIENE PERMISOS
  messaging.getToken()
    .then((token) => {
      if (token) {
        TOKEN = token
        messageNotification.style.visibility = 'hidden'
      } else {
        messageNotification.style.visibility = 'visible'
      }
    })
})


// Obtiene los permisos
function getPermission() {
  messaging.requestPermission()
    .then((es) => {
      messageNotification.style.visibility = 'hidden'
      messaging.getToken()
        .then((token) => {
          TOKEN = token
          ifTokenInDB(token)
            .then((isInDB) => {
              if (!isInDB) {
                sendTokenToServer(token)
              }
            })
        })
    })
}

function ifTokenInDB(token) {
  return database.ref('/navigators/' + IDNavigator).once('value')
    .then((snap) => {
      let data = snap.val()
      if (data) {
        return data.endPoint === token
      }
      return false
    })
}

// Envía el token al servidor
function sendTokenToServer(token) {
  let payload = {
    endPoint: token,
    fecha: firebase.database.ServerValue.TIMESTAMP,
    count: 0
  }
  database.ref('/navigators/' + IDNavigator).set(payload)
}

// Envia a que sume el contador de la DB
function sendCountToServer() {
  database.ref('/navigators/' + IDNavigator).once('value')
    .then((snap) => {
      let data = snap.val()
      let count = data.count
      count++
      let payload = {
        ['/navigators/' + IDNavigator + '/count']: count
      }
      database.ref().update(payload)
    })
}

function notificationsForeground(payload) {
  console.info('Llego mensaje!! ', JSON.stringify(payload, null, 2))
  var snackbarContainer = document.querySelector('#demo-toast-example')
  document.querySelector('#count').innerHTML = payload.data.count
  snackbarContainer.MaterialSnackbar.showSnackbar({ message: 'Mensaje recibido desde el click (' + payload.data.count + ')' })
}
