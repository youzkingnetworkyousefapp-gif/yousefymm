/* YMM Web Notifications Service Worker */
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
    for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
    if (clients.openWindow) return clients.openWindow('./');
  }));
});
self.addEventListener('push', function(event) {
  var data = {};
  try { data = event.data ? event.data.json() : {}; } catch(e) { try { data = { body: event.data.text() }; } catch(e2) {} }
  event.waitUntil(self.registration.showNotification(data.title || 'YMM Social', {
    body: data.body || data.text || 'إشعار جديد',
    icon: data.icon || '/favicon.ico',
    tag: data.tag || 'ymm-notif',
    data: data
  }));
});
