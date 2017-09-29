// Ejemplo tomado de serviceworke.rs

function getEndpoint() {
  return self.registration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.endpoint;
    }

    throw new Error('User not subscribed');
  });
}
 
self.addEventListener('push', function(event) {
  var payload = event.data ? event.data.text() : 'no payload'

  event.waitUntil(
    self.registration.showNotification('ServiceWorker Cookbook', {
      body: payload,
    })
  );
})

self.addEventListener('pushsubscriptionchange', function(event) {
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true })
    .then(function(subscription) {
      return fetch('/register', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint
        })
      })
    })
  )
})

self.addEventListener('notificationclick', function(e) {

  self.registration.getNotifications().then(function (notifications) {
    notifications.forEach(function(notification) {
      notification.close();
    });
  });
});