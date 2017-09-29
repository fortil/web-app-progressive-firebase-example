const admin = require('firebase-admin')

exports.handlerRegistrationDevice = (event) => {
  let navId = event.params.navId
  let registrationToken = event.data.val()
  let options = {
    // priority: 'high',
    delay_while_idle: true,
    priority : 'normal',
    timeToLive: 60 * 60 * 24 * 3
  }

  let payload = {
    notification: {
      title: '¡Bienvenid@!',
      body: 'Recibirás este cuerpo de notificación',
      icon: '/img/logo.png',
      click_action: `https://www.williampenagos.com/`
    },
    // Data que sirve en foreground
    data: {
      ejemplo: 'data de ejemplo'
    }
  }
  admin.messaging().sendToDevice('' + registrationToken, payload, options).then((evt) => {
    console.log(evt.results)
  }).catch((e) => {
    console.error(e)
  })
}