# Sample API server

`create-mithril-app` comes with a sample API server to get you off the ground. It is configured with CORS so SPAs can access it remotely; or it can be proxied to emulate traditional setup.


## Usage

`create-mithril-app` comes with another command `create-mithril-server`. It creates a sample API server. In the terminal, type the following:
```
create-mithril-server <directory>
cd <directory>
npm install
npm run dev
```

This would create the API server app, and runs it in dev mode on port 3750. It is already set up with CORS, so if you refresh your sample mithril SPA in the browser, you should see that the AJAX call succeeds.

This is the typical setup when you want to query remote APIs. Your SPA can query them directly, as long as the APIs are set up with proper CORS.


## Integrate SPA with server side

The more traditional setup is having a server that serves both the API calls and the built SPA files. `create-mithril-app` can emulate that in development mode via proxy. Here are the steps:
1. Keep the API server running on port 3750.
2. On the client side, uncomment the proxy settings in webpack.dev.js
3. Also edit client\model.js, change url from "http://localhost:3750/api/test" to just "/api/test"
4. restart client side dev server

With this setup, webpack-dev-server will proxy all the API calls to the API server, so it would appear that both static files and API calls are on the same domain, and no CORS setup is needed.
