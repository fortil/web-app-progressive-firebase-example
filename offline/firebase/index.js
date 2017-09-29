// Método para saber si está o no online
var connectedRef = firebase.database().ref('.info/connected')

connectedRef.on('value', function (snap) {
  if (snap.val() === true) {
    
    console.log('Está online!!')
  } else {
    
    console.log('Está offline!!')
  }
})