
self.addEventListener('install', function(event) {

  self.skipWaiting();
	
	console.log('Service Worker install.');
  
  var offlinePage = new Request('offline.html');
	
  event.waitUntil(fetch(offlinePage).then(function(response) {return caches.open('offline2').then(function(cache) {return cache.put(offlinePage, response);});}));
});

self.addEventListener('activate', event => {

  // event.waitUntil(clients.claim());
	console.log('Service Worker Activate.');
});

self.addEventListener('fetch', function(event) {

	// console.log('Service Worker Fetch.');
	
  event.respondWith(fetch(event.request).catch(function(error) {return caches.open('offline2').then(function(cache) {return cache.match('offline.html');});}));
}); 

self.addEventListener('refreshOffline', function(response) {

  return caches.open('offline2').then(function(cache) {return cache.put(offlinePage, response);});
}); 

self.addEventListener('push', function (event) {

  var data = event.data.json();   
	
	var opts = {
	
    body: data.body,
    icon: data.icon,
    data: {
      url: data.url
    }
  };
	
  event.waitUntil(self.registration.showNotification(data.title, opts));
}); 

self.addEventListener('notificationclick', function(event) {

  var data = event.notification.data;
	
	event.notification.close();   
	
	event.waitUntil(clients.openWindow(data.url));
});
