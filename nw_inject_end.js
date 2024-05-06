/**
 *
 * @description Stock Alarm
 *
 * @version 2024/04/14 ace 初始版本。
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
 * @author ace
 *
 */
Configuration.loadJS(Configuration.requirejsFile, function() {

	requirejs.config(tw.ace33022.RequireJSConfig);

	requirejs(["tw.ace33022.util.browser.CommonForm", "js-logger"], function(CommonForm, Logger) {

		var txtContentId = 'txtContent' + Math.random().toString(36).substr(2, 6);
		var btnQueryId = 'btnQuery' + Math.random().toString(36).substr(2, 6);
		var btnTestNotificationId = 'btnTestNotification' + Math.random().toString(36).substr(2, 6);

		var tag;

		// var audio = new Audio('http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg');
		
		var notification = null;
		
		jQuery(window).on('focus', function(event) {

			// if ((jQuery('.modal-open').length === 0) && (jQuery('.modal-backdrop').length === 0)) {jQuery('#' + txtContentId).focus();}
		});
		
		tag = '<div class="container-fluid" style="padding-top: 5px;">'
				+ '  <div class="row">'
				+ '    <div class="col-md-offset-3 col-md-6">'
				+ '      <div class="input-group">'
				+ '        <input type="text" id="' + txtContentId + '" class="form-control" tabindex="0" placeholder="條碼" />'
				+ '        <span class="input-group-btn"><input type="button" id="' + btnQueryId + '" class="btn btn-primary" tabindex="0" value="查詢" /></span>'
				+ '      </div>'
				+ '    </div>'
				+ '  </div>'
				+ '</div>';
		// jQuery('body').append(tag);
		
		tag = '<div style="display: flex; flex-direction: row; justify-content: flex-end; width: 100%;">'
				+ '  <button id="' + btnTestNotificationId + '" style="font-size: 20px; font-weight: 700; width: 40%;">Notification</button>'
				+ '</div>';
		jQuery('body').append(tag);
		
		jQuery('#' + txtContentId).on('focus', function(event) {jQuery(this).select();});
		
		jQuery('#' + btnTestNotificationId).on('click', function(event) {
		
			// createNotification('Wow! This is from TestNotification', 'created by @study.tonight', 'https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png');
			
			// console.log(location.origin);
			// console.log(location.pathname);
			
			navigator.serviceWorker.getRegistration(location.origin + location.pathname + 'service_worker').then(function(registration) {
			
				registration.showNotification('Angular User Group Taiwan', {
				
					"icon": "https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png",
					"body": "歡迎加入 Angular 社群",
					"image": "https://augt-forum-upload.s3-ap-southeast-1.amazonaws.com/original/1X/6b3cd55281b7bedea101dc36a6ef24034806390b.png"
				});
			});
		});
		
		/*
		const firebaseConfig = {
		
			apiKey: "AIzaSyDNEP4yz90DYPc7r4pqO6d-ANir499inro",
			authDomain: "stock-alarm-dc6af.firebaseapp.com",
			databaseURL: "https://stock-alarm-dc6af-default-rtdb.asia-southeast1.firebasedatabase.app/",
			projectId: "stock-alarm-dc6af",
			storageBucket: "stock-alarm-dc6af.appspot.com",
			messagingSenderId: "35503173635",
			appId: "1:35503173635:web:c0f82ee0d9c11485f21e36",
			measurementId: "G-17ZP4QJE62"
		};
		*/
		
		firebase.initializeApp({

			apiKey: "AIzaSyDNEP4yz90DYPc7r4pqO6d-ANir499inro",
			authDomain: "stock-alarm-dc6af.firebaseapp.com",
			/* databaseURL: "https://stock-alarm.firebaseio.com", */
			databaseURL: "https://stock-alarm-dc6af-default-rtdb.asia-southeast1.firebasedatabase.app/",
			projectId: "stock-alarm-dc6af",
			storageBucket: "stock-alarm-dc6af.appspot.com",
			messagingSenderId: "35503173635",
			appId: "1:35503173635:web:c0f82ee0d9c11485f21e36",
			measurementId: "G-17ZP4QJE62"
		});
		
		// audio.loop = true;
		
		if ('Notification' in window) {
		
			console.log('Notification permission: ', Notification.permission);
		
			if (Notification.permission == 'granted') {
			
				notification = new Notification('Stock Alarm', {
	
					"body": "確認Notification是否顯示！",
					"icon": "https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png"
					/* "image": "https://augt-forum-upload.s3-ap-southeast-1.amazonaws.com/original/1X/6b3cd55281b7bedea101dc36a6ef24034806390b.png" */
				});			
			}
			else {
			
				if (Notification.permission != 'denied') {
				
					Notification.requestPermission(function(permission) {
					
						console.log('Notification permission: ', permission);
						
						if (permission == 'granted') {
						
							notification = new Notification('Stock Alarm', {
				
								"body": "確認Notification是否顯示！",
								"icon": "https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png"
								/* "image": "https://augt-forum-upload.s3-ap-southeast-1.amazonaws.com/original/1X/6b3cd55281b7bedea101dc36a6ef24034806390b.png" */
							});			
						}
					});
				}
			}
			
			if (notification != null) {
			
				notification.addEventListener("show", () => {
				
					console.log('notification show');
					
					// audio.play();
				});
				
				notification.addEventListener("click", () => {
				
					console.log('notification click');
					
					notification.close();
					
					// display about message?
					
					// audio.pause();
				});

				notification.addEventListener("close", () => {
				
					console.log('notification close');
					
					// audio.pause();
				});
			}
		}
		else {

			console.log('Notification not in Navigator.');
		}
		
		if ('serviceWorker' in navigator) {
		
			// console.log(location.origin + location.pathname + 'service_worker.js');
			
			navigator.serviceWorker.register(location.origin + location.pathname + 'service_worker.js')
			.then(function(registration) {
			
				console.log('Register serviceWorker complete.');
				
				// console.log('registration: ' + registration);
				
				firebase.messaging().getToken({
				
					"vapidKey": "BB29FY8R7vgk3HA5yRlE-yzQzMowlT7dnEkYEwq9QArjLUXZ2dPzXDtXt2L6DQIVTn3HaLHXMPZh6ztdA7sgtNM",
					"serviceWorkerRegistration": registration
				})
				.then((currentToken) => {
				
					if (currentToken) {
					
						// Send the token to your server and update the UI if necessary
						console.log('currentToken: ' + currentToken);
						
						jQuery('body').append('<div>' + currentToken + '</div>');
						
						// 使用realtime database紀錄
						// return currentToken;
					} 
					else {
					
						// Show permission request UI
						console.log('No registration token available. Request permission to generate one.');
						
						jQuery('body').append('<div>No registration token available. Request permission to generate one.</div>');
					}
				})
				.catch((error) => {
				
					console.log('An error occurred while retrieving token. ', error);
					
					jQuery('body').append('<div>An error occurred while retrieving token.</div>');
					jQuery('body').append('<div>' + error + '</div>');
				});
				
			})
			.catch(function(error) {
			
				console.log('Register serviceWorker occur with error. ', error);
				
				jQuery('body').append('<div>Register serviceWorker occur with error.</div>');
				jQuery('body').append('<div>' + error + '</div>');
			});
		}
		else {
		
			console.log('Navigator don\'t have serviceWorker.');
		}
		
		firebase.messaging().onMessage(payload => {
		
			// @memo 2024/05/03 ace 接收到的訊息即使有notification屬性，也不會預設以Notification顯示，可自行處理收到的訊息。
		
			console.log('onMessage received.', payload);
			
			/* "icon": "https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png", */
			/* "image": "https://augt-forum-upload.s3-ap-southeast-1.amazonaws.com/original/1X/6b3cd55281b7bedea101dc36a6ef24034806390b.png", */
			/*
			navigator.serviceWorker.getRegistration(location.origin + location.pathname + 'service_worker').then(function(registration) {
			
				registration.showNotification(payload["notification"]["title"], {
				
					"body": payload["notification"]["body"]
				});
			});
			*/
		});
		
		/*
		firebase.database().ref('/point').once('value', function(snapshot) {
		
			console.log('Once Value');
			// console.log(snapshot.key());
			console.log(snapshot.key);
			console.log(snapshot.val());
			// the console.log will return NULL, database is empty
		});
		*/
		
		/*
		firebase.database().ref('/alert/20240423').on('child_added', function(snapshot, prevChildKey) {
		
			var tag = '';
		
			// child_added會先將原有資料讀入乙次！如何不讀入舊有資料？
			// 增加判斷時間的條件？
			console.log('child added');
			// console.log(snapshot.key);
			console.log(snapshot.val());
			
			tag = '<div>' + snapshot.val() + '</div>';
			jQuery('body').append(tag);
			
			// createNotification('TX', snapshot.val(), 'https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png');
			
			var audio = new Audio('http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg');
			
			var notification = null;
			
			audio.loop = true;
			
			notification = new Notification('Stock Alarm', {
			
				"body": snapshot.val(),
				"icon": "https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png"
			});			
			
			notification.addEventListener("show", () => {
			
				console.log('notification show');
				
				// audio.play();
			});
			
			notification.addEventListener("click", () => {
			
				console.log('notification click');
				
				notification.close();
				
				// display about message?
				
				// audio.pause();
			});

			notification.addEventListener("close", () => {
			
				console.log('notification close');
				
				// audio.pause();
			});
		});
		*/
	});
});
