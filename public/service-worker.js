console.log('service-worker.js entered');

self.addEventListener('fetch', event => {
  const {url} = event.request;
  console.log('service-worker fetch: url =', url);
});

self.addEventListener('activate', event => {
  console.log('service-worker activate entered');
});

self.addEventListener('install', event => {
  console.log('service-worker install entered');
});

self.addEventListener('push', event => {
  console.log('service-worker push entered');
});

self.addEventListener('sync', event => {
  console.log('service-worker sync entered');
});
