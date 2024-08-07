/**
 *
 * @description Service Worker
 *
 * @version 2024/05/03 ace 初始版本。
 *
 * @see {@link http://requirejs.org/|RequireJS}
 *
 * @see {@link https://jquery.com/|jQuery}
 *
 * @see {@link https://getbootstrap.com/|Bootstrap · The most popular HTML, CSS, and JS library in the world.}
 *
 * @see {@link http://underscorejs.org/|Underscore.js}
 * @see {@link https://github.com/jashkenas/underscore|jashkenas/underscore: JavaScript's utility _ belt}
 *
 * @see {@link http://backbonejs.org/|Backbone.js}
 * @see {@link https://github.com/jashkenas/backbone|jashkenas/backbone: Give your JS App some Backbone with Models, Views, Collections, and Events}
 * @see {@link https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites|Tutorials, blog posts and example sites · jashkenas/backbone Wiki}
 *
 * @see {@link https://blog.changyy.org/2017/10/firebase-firebase-firebase-cloud.html|第二十四個夏天後: Firebase 開發筆記 - Firebase Cloud Messaging (FCM) 初體驗、 Topic 管理與 Web notification}
 * @see {@link https://blog.changyy.org/2017/10/firebase-firebase-fcm-web-app-debug.html#google_vignette|第二十四個夏天後: Firebase 開發筆記 - FCM 與 Web app debug}
 *
 * @memo 2024/05/03 ace firebase.messaging()提供onMessage/onBackgroundMessage listener對應接收到訊息呼叫的對象。
 * @memo 2024/05/03 ace 當瀏覽器開啟網頁且維持在當前的操作頁面，當接收到訊息時會呼叫onMessage listener並傳入資料，自行依需求處理資料呈現方式(Toast or Notification)。
 * @memo 2024/05/03 ace 當瀏覽器未開啟網頁或切換至其他分頁時，當接收到訊息時會呼叫onBackgroundMessage listener並傳入資料，由於處於非當前的操作畫面，應採用Notification的方式處理訊息的呈現。
 *
 * @author ace
 *
 */

importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-database-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

firebase.initializeApp({

	apiKey: "AIzaSyDNEP4yz90DYPc7r4pqO6d-ANir499inro",
	authDomain: "stock-alarm-dc6af.firebaseapp.com",
	databaseURL: "https://stock-alarm-dc6af-default-rtdb.asia-southeast1.firebasedatabase.app/",
	projectId: "stock-alarm-dc6af",
	storageBucket: "stock-alarm-dc6af.appspot.com",
	messagingSenderId: "35503173635",
	appId: "1:35503173635:web:c0f82ee0d9c11485f21e36",
	measurementId: "G-17ZP4QJE62"
});

firebase.messaging().onBackgroundMessage(payload => {

	// @memo 2024/05/03 ace onBackgroundMessage listener接收的資料中若是存在notification屬性，預設會呼叫Notification方式顯示資料內容。
	// @memo 2024/05/03 ace 若需要自行處理資料的呈現方式，但礙於接收的資料存在notification屬性造成onBackgroundMessage listener產生Notification方式顯示資料內容，就不要使用onBackgroundMessage listener。
	// @memo 2024/05/03 ace 實測發現，onBackgroundMessage listener沒有設定會造成onMessage listener無法接收到資料。
	// @memo 2024/05/03 ace 避免造成重複顯示Notification訊息的狀況，透過Firebase Cloud Messaging的資料應設定好完整內容，由onBackgroundMessage listener自行呼叫Notification方式顯示資料內容。
	
	var title = null;
	var body = null;
	
	console.log('BackgroundMessage');
	
	console.log('payload: ', payload);
	console.log('payload["notification"]: ', payload["notification"]);
	
	if (!payload["notification"]) {
	
		if (payload["data"]["title"]) title = payload["data"]["title"];
		if (payload["data"]["body"]) body = payload["data"]["body"];
		
		console.log('title: ' + title);
		console.log('body: ' + body);
		
		if ((title != null) && (body != null)) {
		
			self.registration.showNotification(title, {
			
				/* "icon": "https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png", */
				/* "image": "https://augt-forum-upload.s3-ap-southeast-1.amazonaws.com/original/1X/6b3cd55281b7bedea101dc36a6ef24034806390b.png", */
				"body": body
			});
		}
	}
});

// @memo 2024/05/03 ace Push API，當傳送/接收資料時會呼叫此listener。
self.addEventListener('push', function(event) {

	console.log('serviceWorker push.');
	
	console.log('event: ', event);
	console.log('event.data.json(): ', event.data.json());
	
	/* "icon": "https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png", */
	/* "image": "https://augt-forum-upload.s3-ap-southeast-1.amazonaws.com/original/1X/6b3cd55281b7bedea101dc36a6ef24034806390b.png", */
	/*
	event.waitUntil(self.registration.showNotification(event.data.json().notification.title, {
	
			"body": event.data.json().notification.body
		})
	);
	*/
}); 

self.addEventListener('install', function(event) {

	console.log('Service Worker install.');
	
	// console.log('self.registration: ' + self.registration);
  
  self.skipWaiting();
	
  var offlinePage = new Request('offline.html');
	
  event.waitUntil(fetch(offlinePage).then(function(response) {return caches.open('offline2').then(function(cache) {return cache.put(offlinePage, response);});}));
});

self.addEventListener('activate', event => {

	console.log('Service Worker Activate.');
	
	// console.log('self.registration: ' + self.registration);
	
  // event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {

	// console.log('Service Worker Fetch.');
	
  event.respondWith(fetch(event.request).catch(function(error) {return caches.open('offline2').then(function(cache) {return cache.match('offline.html');});}));
}); 

self.addEventListener('refreshOffline', function(response) {

  return caches.open('offline2').then(function(cache) {return cache.put(offlinePage, response);});
}); 

self.addEventListener('notificationclick', function(event) {

  var data = event.notification.data;
	
	console.log('notificationclick', event);
	
	event.notification.close();   
	
	event.waitUntil(clients.openWindow(data.url));
});
