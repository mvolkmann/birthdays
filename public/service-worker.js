console.log('service-worker.js entered');

self.addEventListener('fetch', event => {
  const {url} = event.request;
  console.log('service-worker fetch: url =', url);
});
