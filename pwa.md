# Progressive Web Applications (PWA)

## Overview

## Service Workers

Lifecycle events ...

During development it is often necessary to force certain files to be reloaded.
Files cached by a service worker are not cleared by clearing the browser cache.
In Chrome, one approach to force files to be reloaded
on the next browser refresh is to open the devtools,
select the "Application" tab, select "Service Workers",
and click the "Unregister" link for the service worker.

## Working Offline With Cached Assets

This uses the CacheStorage API.

## Persisting Data With IndexedDB

## Background Sync

## Communications Between Page and Service Worker

## REST Calls From Service Worker

## Adding Apps to Homescreen

## Push Notifications

## PWA User Experience (UX)

## create-react-app

The easiest way to create the starting point for a new React application
is to use create-react-app.

To install this, enter `npm install -g create-react-app`.

To create a new app:

```bash
create-react-app {app-name}
cd {app-name}
npm install
npm start
```

This will create the starting files for the app,
install all the dependencies,
start a local HTTP server that watches for changes,
and run the app in a new browser window
that supports live reload.

One of the files this generates is `src/service-worker.js`
which supports offline usage of the application
after an initial online usage by caching all required assets.
This capability is **not enabled by default**.
To enable it, edit `src/index.js`
and change the line `serviceWorker.unregister();`
to `serviceWorker.register();`.

This uses the workbox-webpack-plugin to cache assets
and keep them up to date when changes are deployed.

It is recommended to leave this disabled during development
because it can make debugging more difficult.

## Future

## Conclusion

Thanks to ? for reviewing this article!

## Resources

"Building Progressive Web Apps" book\
Tal Ater, 2017, O'Reilly

Create React App - Making a Progressive Web App\
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
