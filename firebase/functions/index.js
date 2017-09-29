var functions = require('firebase-functions')
var admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.getNewClientSuscription = functions.database.ref('/navigators/{navId}').onWrite(function (event) {
  var navId = event.params.navId
  var data = event.data.val()
  var options = {
    // priority: 'high',
    delay_while_idle: true,
    priority : 'high',
    timeToLive: 60 * 60 * 24 * 3
  }
  console.log(data)
  var payload = {
    notification: {
      title: '¡Bienvenid@!',
      body: 'Bienvenido a mi página web, recibirás todas las actualizaciones.',
      icon: '/images/ic_mood_black_24dp_3x.png',
      click_action: 'https://www.williampenagos.com/'
    },
    data: {
      ejemplo: 'data de ejemplo',
      count: JSON.stringify(data.count)
    }
  }
  admin.messaging().sendToDevice('' + data.endPoint, payload, options).then(function(evt) {
    console.log(evt.results)
  }).catch((e) => {
    console.error(e)
  })
})
