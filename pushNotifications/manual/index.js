// Ejemplo tomado de serviceworke.rs

navigator.serviceWorker.register('service-worker.js')
.then(function(registration) {
 
  return registration.pushManager.getSubscription()
  .then(function(subscription) {
 
    if (subscription) {
      return subscription;
    }

    return registration.pushManager.subscribe({ userVisibleOnly: true });
  });
  
}).then(function(subscription) {
   
  fetch('/register', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
    }),
  });
})

