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

##Require.js
Aerobatic strives to be unopinionated about how you build apps, however it does currently mandate the use of require.js to asynchronously load your client assets. While require.js is a powerful library with some advanced features, you really only need to understand a few basic constructs - the define and require functions, and a little about how configuration works.
