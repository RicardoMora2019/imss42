

// Registering Service Worker
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw-menos42.js');
};

// Requesting permission for Notifications after clicking on the button
var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
	Notification.requestPermission().then(function(result) {
		if(result === 'granted') {
			randomNotification();
		}
	});
});

// Setting up random Notification
 function randomNotification() {
	/* var randomItem = Math.floor(Math.random()*games.length);
	var notifTitle = games[randomItem].name;
	var notifBody = 'Created by '+games[randomItem].author+'.';
	var notifImg = 'data/img/'+games[randomItem].slug+'.jpg'; */
	
	var notifTitle ='Ejemplo de noticifacion IMSS';
	var notifBody = 'Creado por IMSS julio 2019';
	var notifImg = './img/iphone.png';
	
	var options = {
		body: notifBody,
		icon: notifImg
	}
	var notif = new Notification(notifTitle, options);
	setTimeout(randomNotification, 60000);
}; 

// Progressive loading images
var imagesToLoad = document.querySelectorAll('img[data-src]');
var loadImages = function(image) {
	image.setAttribute('src', image.getAttribute('data-src'));
	image.onload = function() {
		image.removeAttribute('data-src');
	};
};
if('IntersectionObserver' in window) {
	var observer = new IntersectionObserver(function(items, observer) {
		items.forEach(function(item) {
			if(item.isIntersecting) {
				loadImages(item.target);
				observer.unobserve(item.target);
			}
		});
	});
	imagesToLoad.forEach(function(img) {
		observer.observe(img);
	});
}
else {
	imagesToLoad.forEach(function(img) {
		loadImages(img);
	});
}