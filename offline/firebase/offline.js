window['IDNavigator'] = navigator.userAgent.replace(/(\s|\.|#|\$|\\|\[|\]|\(|\)|\/|;|,|:|\?|\*|&|\+|!|¡|\?)/g, '_')

let payload = {
  endPoint: token,
  fecha: firebase.database.ServerValue.TIMESTAMP,
  count: 0
}
database.ref('/navigators/' + IDNavigator).set(payload)