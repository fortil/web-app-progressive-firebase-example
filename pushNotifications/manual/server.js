var webPush = require('web-push')
 
var subscriptions = []
 
var pushInterval = 10
 
if (!process.env.GCM_API_KEY) {
  console.error('If you want Chrome to work, you need to set the ' +
                'GCM_API_KEY environment variable to your GCM API key.')
} else {
  webPush.setGCMAPIKey(process.env.GCM_API_KEY)
}
 
function sendNotification(endpoint) {
  webPush.sendNotification({
    endpoint: endpoint
  }).then(function() {
    console.log('Push Application Server - Notification sent to ' + endpoint)
  }).catch(function() {
    console.log('ERROR in sending Notification, endpoint removed ' + endpoint)
    subscriptions.splice(subscriptions.indexOf(endpoint), 1)
  })
}
 
setInterval(function() {
  subscriptions.forEach(sendNotification)
}, pushInterval * 1000)

function isSubscribed(endpoint) {
  return (subscriptions.indexOf(endpoint) >= 0)
}

module.exports = function(app, route) {
 
  app.post(route + 'register', function(req, res) {
    var endpoint = req.body.endpoint
    if (!isSubscribed(endpoint)) {
      console.log('Subscription registered ' + endpoint)
      subscriptions.push(endpoint)
    }
    res.type('js').send('{"success":true}')
  })

  app.post(route + 'unregister', function(req, res) {
    var endpoint = req.body.endpoint
    if (isSubscribed(endpoint)) {
      console.log('Subscription unregistered ' + endpoint)
      subscriptions.splice(subscriptions.indexOf(endpoint), 1)
    }
    res.type('js').send('{"success":true}')
  })
}