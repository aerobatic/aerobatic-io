# Technical Details

This section is intended to provide a deeper dive into the inner workings of Aerobatic to give you a better understanding of what is going on behind the scenes.

In the Aerobatic paradigm, the initial page load is handled by the Aerobatic platform, known as the Airport server. This response is just a bare bones shim which includes page metadata like the favicon and title tag. Next up is a reserved __\_\_config\_\___ global variable which contains configuration settings passed from the server to the browser. (As a side note, Aerobatic makes use of the double underscores, aka "dunders", for reserved variables throughout the codebase. This is both an homage to Python and they look like little wings;) Finally there is a lone script include to a file called cockpit.min.js. Cockpit.js primarily consists of require.js itself along with a small amount of Aerobatic specific helper code.

### Full Source Code of www.aerobatic.io

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Aerobatic | Wings for nimble web apps</title>
    <meta charset="UTF-8"><link rel='apple-touch-icon' sizes='57x57' href='/apple-touch-icon-57x57.png'>
<link rel='icon' sizes='196x196' href='/favicon-196x196.png'>
    <meta name="fragment" content="!">
    <meta name="google-site-verification" content="YbKZLxUG3Ofxi-WvBgTalaMUg7azE4-5tmLya_6esRk">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <script>
    </script>
    <script src="https://aerobaticapp.com/cockpit.min.js"></script>
    <body>
    </body>
  </head>
</html>
```

##Migrating off Aerobatic
