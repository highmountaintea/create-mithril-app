# create-mithril-app - Sets up a mithril.js project with webpack

[![npm package](https://nodei.co/npm/create-mithril-app.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/create-mithril-app/)

Creates a mithril.js project for you.

## Usage

First install this app with `npm i -g create-mithril-app`, then type the following:
```
create-mithril-app <directory>
cd <directory>
npm install
npm run dev
```

This would create a mithril.js project in the directory specified, install the appopriate modules, and run the skeleton app on port 8080. Open your browser to http://localhost:8080 and you should see a `Hello World !!` screen.

This mithril.js project is set up with webpack-dev-server, so when you start editing the project with your favorite code editor, your browser would reflect the changes instantly.

**Note** create-mithril-app can also be run using `npx`

## Purpose

I feel mithril.js can benefit from a battery-included tool to set up a project. This tool creates a project with the following:

* webpack-dev-server configured with live reload
* webpack configured with babel
* build pipeline already set up
* a sample Hello World app to kick start

Hopefully this can lower the barrier for new developers to try out mithril, and simplify the mundane task of creating a new project for seasoned developers.

## Project structure ##

* `client` - the directory for source JS files
* `public` - the directory for static files (html, css etc.)
* `webpack.dev.js` - used by webpack-dev-server when running in dev mode
* `webpack.build.js` - used by webpack to build the production files
* `package.json` - modify this file to configure the name and license of your app

## Configuration

The created project comes with two webpack files, one for development, one for build. They can be configured further to suit your needs. *Please be aware we cannot support all these different configurations*

## Build

`npm run build` would create the deployable files in the build directory.

## Server-side API

`create-mithril-app` is designed for developing client side applications that access APIs remotely. It can easily integrate with a backend server too. Please see [Server setup](https://github.com/johnfliu818/create-mithril-app/blob/master/server-setup.md) for the sample API server that comes with this app.

## Release Logs

* 1.0.6 - Added Babel to dev server, and supports spread operator.
* 1.0.5 - Fixed breakpoint debugging in dev mode
* 1.0.3 - Build files are now minified by default, and build pipeline is configurable.
* 1.0.0 - Bumped to 1.0.0 after going through more field testing.
* 0.2.4 - Fully working and supporting dev and build pipeline.

## Special Thanks

To [mithril.js team](https://mithril.js.org/simple-application.html) for building such an interesting framework. To `create-react-app` for the inspiration.