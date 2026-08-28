// Miller Hardware Delivery — background push notification handler.
// This file MUST be deployed at the site root (alongside index.html), not bundled into the app.
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:"AIzaSyDNEl1mXtNLGN0nsvr1lZi7SJzsiypJFLM",
  authDomain:"millersawshop-f716a.firebaseapp.com",
  databaseURL:"https://millersawshop-f716a-default-rtdb.firebaseio.com",
  projectId:"millersawshop-f716a",
  storageBucket:"millersawshop-f716a.firebasestorage.app",
  messagingSenderId:"187757043776",
  appId:"1:187757043776:web:a0cce22b59172da8db7fa5"
});

const messaging = firebase.messaging();

// Fires when a push arrives and the app isn't in the foreground.
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'Miller Hardware Delivery';
  const options = {
    body: (payload.notification && payload.notification.body) || '',
    icon: (payload.notification && payload.notification.icon) || undefined,
    badge: undefined,
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

// Tapping the notification focuses an already-open tab, or opens a new one.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
      return null;
    })
  );
});
