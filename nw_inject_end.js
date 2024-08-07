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

		function showNotification(title, option) {
		
			navigator.serviceWorker.getRegistration(location.origin + location.pathname + 'service_worker')
			.then(function(registration) {
			
				registration.showNotification(title, option);
			})
			.catch(function(error) {
			
				console.log('getRegistration() occur with error: ', error);
				
				jQuery('body').append('<div>getRegistration() occur with error: ' + error + '</div>');
			});
		}
		
		function initializeFirebase() {
		
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
		}
		
		var txtContentId = 'txtContent' + Math.random().toString(36).substr(2, 6);
		var btnTestNotificationId = 'btnTestNotification' + Math.random().toString(36).substr(2, 6);

		var tag;

		// var audio = new Audio('http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg');
		
		jQuery(window).on('focus', function(event) {

			// if ((jQuery('.modal-open').length === 0) && (jQuery('.modal-backdrop').length === 0)) {jQuery('#' + txtContentId).focus();}
		});
		
		tag = '<div class="container-fluid" style="padding-top: 5px;">'
				+ '  <div class="row">'
				+ '    <div class="col-md-offset-3 col-md-6">'
				// + '      <div class="input-group">'
				// + '        <input type="text" id="' + txtContentId + '" class="form-control" tabindex="0" placeholder="條碼" />'
				// + '      </div>'
				+ '    </div>'
				+ '  </div>'
				+ '</div>';
		// jQuery('body').append(tag);
		
		tag = '<div style="display: flex; flex-direction: row; justify-content: flex-end; width: 100%;">'
				+ '  <button id="' + btnTestNotificationId + '" style="font-size: 20px; font-weight: 700; width: 40%;">Notification</button>'
				+ '</div>';
		jQuery('body').append(tag);
		
		// jQuery('#' + txtContentId).on('focus', function(event) {jQuery(this).select();});
		
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
		
		// audio.loop = true;
		
		jQuery('body').append('<div>' + 'window.Notification: ' + window.Notification + '</div>');
		jQuery('body').append('<div>' + 'navigator.serviceWorker: ' + navigator.serviceWorker + '</div>');
		
		// @memo 2024/08/07 ace 有serviceWorker物件時才進行程式。
		if ('serviceWorker' in navigator) {
		
			console.log('location.origin: ' + location.origin);
			console.log('location.pathname' + location.pathname);
			console.log(location.origin + location.pathname + 'service_worker.js');
			
			jQuery('body').append('<div>location.origin: ' + location.origin + '</div>');
			jQuery('body').append('<div>location.pathname: ' + location.pathname + '</div>');
			jQuery('body').append('<div>service_worker: ' + location.origin + location.pathname + 'service_worker.js' + '</div>');
			
			navigator.serviceWorker.register(location.origin + location.pathname + 'service_worker.js')
			.then(function(registration) {
			
				console.log('Register serviceWorker complete.');
				
				jQuery('body').append('<div>' + 'Register serviceWorker complete.' + '</div>');
				
				// console.log('registration: ' + registration);
				
				if ('Notification' in window) {
				
					console.log('Notification permission: ', Notification.permission);
					
					jQuery('body').append('<div>' + 'Notification permission: ' + Notification.permission + '</div>');
					
					if (Notification.permission == 'granted') {
					
						showNotification('Stock Alarm', {
			
							"body": "確認Notification是否顯示！",
							"icon": "https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png"
							/* "image": "https://augt-forum-upload.s3-ap-southeast-1.amazonaws.com/original/1X/6b3cd55281b7bedea101dc36a6ef24034806390b.png" */
						});			
					}
					else {
					
						Notification.requestPermission(function(permission) {
						
							console.log('Notification permission: ', permission);
							
							jQuery('body').append('<div>' + 'Notification permission: ' + Notification.permission + '</div>');
							
							showNotification('Stock Alarm', {
				
								"body": "確認Notification是否顯示！",
								"icon": "https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png"
								/* "image": "https://augt-forum-upload.s3-ap-southeast-1.amazonaws.com/original/1X/6b3cd55281b7bedea101dc36a6ef24034806390b.png" */
							});			
						});
					}
				}
				else {

					console.log('Notification not in Navigator.');
					
					jQuery('body').append('<div>' + 'Notification not in window.' + '</div>');
				}
					
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
			
				firebase.messaging().getToken({
				
					"vapidKey": "BB29FY8R7vgk3HA5yRlE-yzQzMowlT7dnEkYEwq9QArjLUXZ2dPzXDtXt2L6DQIVTn3HaLHXMPZh6ztdA7sgtNM",
					"serviceWorkerRegistration": registration
				})
				.then((currentToken) => {
				
					if (currentToken) {
					
						// Send the token to your server and update the UI if necessary
						console.log('currentToken: ' + currentToken);
						
						jQuery('body').append('<div>' + 'currentToken: ' + currentToken + '</div>');
						
						firebase.messaging().onMessage(payload => {
						
							console.log('onMessage received.');
							
							jQuery('body').append('<div>' + 'onMessage received.' + '</div>');
							
							console.log('payload: ', payload);
							console.log('payload["notification"]: ', payload["notification"]);
							
							if (!payload["notification"]) {
							
								if (payload["data"]["title"]) title = payload["data"]["title"];
								if (payload["data"]["body"]) body = payload["data"]["body"];
								
								console.log('title: ' + title);
								console.log('body: ' + body);
								
								if ((title != null) && (body != null)) {
								
									showNotification(title, {
									
										"body": body
									});
								}
							}
						});
						
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
			
			jQuery('body').append('<div>Navigator don\'t have serviceWorker.</div>');
		}
	});
});
