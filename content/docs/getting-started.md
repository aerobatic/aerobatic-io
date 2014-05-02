# Getting Started

Aerobatic's goal is to get you up and running in 10 minutes or less. First off
you're going to need node.js. If you don't already have that, head on over to
[http://nodejs.org](http://nodejs.org) and install it for your platform.

Ok, now that you've got node installed, next we need the yoke command line tool. You'll be using it constantly when developing on the Aerobatic platform to run your local simulator server, push new versions to the cloud, execute unit tests, and more. Installation is a breeze with npm (which was installed as part of
node).

```bash
yoke install -g aerobatic-yoke
```

## Building Your First App
1. Login to your Aerobatic dashboard and click the Create App button
2. Choose a name for your app. The URL for your app will be http://<your-app-name>.aerobaticapp.com
3. Follow the instructions in the dashboard

Rather than starting from a blank slate, you can clone one of the samples in the [app gallery](#!/gallery).

##RequireJS
Aerobatic strives to be unopinionated about how you build apps, however it does currently mandate the use of [RequireJS](http://requirejs.org) to asynchronously load your client assets. The technical reason for this is to enable the simulator mode (more about that below) which allows local development directly against the production site URL. With RequireJS it is possible to defer the determination of where to download assets to the browser rather than the server rendering script urls directly to the page response. Independent of Aerobatic, using an AMD loader like RequireJS provides many benefits to a single page web app, particularly as it grows in complexity. 

<i class='icon-book'></i>[More about RequireJS configuration](#!/docs/developing-apps?section=requirejs)

## Configuration
Every Aerobatic app requires a configuration file called aerobatic.json in the root of the app source directory. The structure of this file matches the [config object](http://requirejs.org/docs/api.html#config) for RequireJS along with some additional Aerobatic specific settings.

<i class='icon-book'></i>[More about aerobatic.json configuration](#!/docs/developing-apps?section=aerobatic.json)

## Developing
Yoke is the developer companion command line tool for building Aerobatic apps. Two of it's main operations are __sim__ and __push__. The sim command is used to enter simulator mode where your assets are loaded from your local working directory rather than the production assets out on the CDN. You start the simulator from the root of your app directory like so:

```bash
yoke sim
```
Then navigate your browser to your app's production URL with a sim=1 parameter in the querystring.
```
http://my-app.aerobaticapp.com?sim=1
```
Now you can start making code changes locally and have them automatically reflect when you refresh the page. Since your browser is loading the actual app URL, any integration issues should become immedietely apparent rather than discovering them only after deploying. This also avoids setup challenges associated with talking to external services when running from localhost - for example OAuth providers. You may want to programatically prevent your web analytics from executing in simulator mode with code like this:

```javascript
if (aerobatic.config.simulator !== true)
	ga('create', aerobatic.config.settings.GOOGLE_ANALYTICS_TRACK_CODE, {});
```
<i class='icon-book'></i>[More about simulator mode](#!/docs/developing-apps?section=simulator)

## Deploying 
Pushing code to production is just another yoke command.

```bash
yoke push
```

The push command by itself will only stage the new version in the cloud, but not actually direct any live traffic to it. You would need to login to your app dashboard and adjust the traffic control rules some percentage of visitor sessions get the new version. But when you're just getting started you probably just want to force all traffic to the new version, which you can do with the -F switch.

```bash
yoke push -F
```

By default new versions will get an auto-generated name based on a timestamp. But you can provide a custom name with the --name arg.

```bash
yoke push --name "release 1.2.5"
```

<i class='icon-book'></i> [Read more about app versioning](#!/docs/versioning)

## Live in Production
Once you've pushed your code with the -F switch, you can go see it live at http://my-app.aerobaticapp.com without the sim=1 querystring.
