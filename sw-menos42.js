self.importScripts('data/games.js');

// Files to cache
var cacheName = 'prueba-menos42';
var appShellFiles = [
  './',
  './index.html',
  './app.js',
  './style.css',
  './fonts/graduate.eot',
  './fonts/graduate.ttf',
  './fonts/graduate.woff',
  './favicon.ico',
  './img/course_logo.png',
  './img/btn-anterior.png',
  './img/btn-siguiente.png',
  './img/logo_curso.png',
  './icons/icon-32.png',
  './icons/icon-64.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-168.png',
  './icons/icon-192.png',
  './icons/icon-256.png',
  './icons/icon-512.png',
  './bootstrap/bootstrap.min.css',
  './bootstrap/bootstrap.min.js',
  './bootstrap/jquery.min.js',
  './bootstrap/popper.min.js',
  './js/footer.js',
  './css/estilos.css',
  './css/template.css',
  './data/img/video1.mp4'
];

 var gamesImages = [];
 
 for(var i=0; i<games.length; i++) {
  gamesImages.push('data/img/'+games[i].slug);
  //gamesImages.push('data/img/'+games[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(gamesImages); 

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});