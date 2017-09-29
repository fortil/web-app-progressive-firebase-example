// Método para saber si está o no online
navigator.serviceWorker.addEventListener('controllerchange', function(event) {
  console.log(
    '[controllerchange] A "controllerchange" event has happened ' +
    'within navigator.serviceWorker: ', event
  );
 
  navigator.serviceWorker.controller.addEventListener('statechange',
    function() {
      console.log('[controllerchange][statechange] ' +
        'A "statechange" has occured: ', this.state
      );
 
      if (this.state === 'activated') {
 
        console.log('Está online!!')
      } else {

        console.log('Está offline!!')
      }
    }
  );
});