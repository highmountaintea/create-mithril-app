**create-mithril-app** sets up a mithril.js project for you, with webpack already configured.

Install with `npm i -g create-mithril-app`, then type the following:
```
create-mithril-app <directory>
cd <directory>
npm install
npm run dev
```

This creates a mithril.js project in the directory specified, install the appopriate modules, and run the skeleton app on port 8020. Open your browser to http://localhost:8020 and you should see a sample mini-app running. It is set up with webpack-dev-server, so when you start editing the code, your browser would reflect the changes instantly.

# Table of Contents

* [Purpose](#purpose)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Configuration](#configuration)
* [Build](#build)
* [Server-side API](#server-side-api)
* [Release Logs](#release-logs)


## Purpose

I feel mithril.js can benefit from a battery-included tool to set up a project. This tool creates a project with the following:

* webpack-dev-server configured with live reload
* webpack configured with babel
* build pipeline already set up
* a sample Hello World app to kick start

Hopefully this can lower the barrier for new developers to try out mithril, and simplify the mundane task of creating a new project for seasoned developers.

## Usage

* `create-mithril-app <directory>` - creates a skeleton app with mithril.js and webpack set up in the <directory> specified.
* `create-mithril-app api <directory>` - creates a sample backend application in the <directory> specified. This sample application can serve API for the mithril.js app.
* `create-mithril-app download <sample-mithril-app|sample-mithril-api> <version>` - explicitly downloads a sample template into the cache. This is usually not necessary, unless you want to use a specific version of the template
* `create-mithril-app rm <sample-mithril-app|sample-mithril-api>` - removes the corresponding sample template from the cache.
* The cache resides at `~/.create-mithril-app` directory

## Project structure

The skeleton project created by `create-mithril-app` has the following structure.

* `client` - the directory for source JS files
* `public` - the directory for static files (html, css etc.)
* `webpack.dev.js` - used by webpack-dev-server when running in dev mode
* `webpack.build.js` - used by webpack to build the production files
* `package.json` - modify this file to configure the name and license of your app

## Configuration

The created project comes with two webpack files, one for development, one for production build. They can be configured further to suit your needs. *Please be aware we cannot support all these different configurations*

## Build

`npm run build` creates the deployable files in the build directory.

## Server-side API

`create-mithril-app` is designed for developing client side applications that access APIs remotely. It can easily integrate with a backend server too. Please see [Server setup](https://github.com/highmountaintea/create-mithril-app/blob/master/server-setup.md) for the sample API server that comes with this app.

## Release Logs

* 2.1.0 - decouples from `sample-mithril-app` dependency. User can now fetch the latest `sample-mithril-app` without needing to update `create-mithril-app` every time.
* 2.0.1 - now uses mithril v2
* 1.0.25 - now supports creating a new app into an empty directory
* 1.0.24 - updated to webpack 4
* 1.0.21 - fixed path not found issue under Linux
* 1.0.14 - now can inject environment variables via .env, .env.development, and .env.production
* 1.0.11 - fixed async/await bug
* 1.0.9 - Added `create-mithril-server`
* 1.0.6 - Added Babel to dev server, and supports spread operator.
* 1.0.5 - Fixed breakpoint debugging in dev mode
* 1.0.3 - Build files are now minified by default, and build pipeline is configurable.
* 1.0.0 - Bumped to 1.0.0 after going through more field testing.
* 0.2.4 - Fully working and supporting dev and build pipeline.

## Special Thanks

To [mithril.js team](https://mithril.js.org/simple-application.html) for building such an interesting framework. To `create-react-app` for the inspiration.