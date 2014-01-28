browser-router
==============

A simple router for one page browser apps

## INSTALL

`npm install --save browser-router`

`var router = require('browser-router')`

## API

### route(path, params, title)

```
  router.route('/login', { next: '/secret/' }, 'Log In');
```

Make the router execute a route. This does a browser pushState to change the URL and params, while keeping the client app running.

### back()

```
  router.back();
```

Takes the browser one page back in history.

### forward()

```
  router.forward();
```

Takes the browser forward in history.

### onRoute(handler)

```
  router.onRoute(function(route, params, title) {
  
  });
```

Catch an incoming route from the browser. This could have been from a route(), back(), forward(), or the user's change.

### getPath()

```
> getPath()
'/login'
```

Grab the current path. Excludes search query and hashstring parameters.

### router.getTitle()


```
> getPath()
'/login'
```

Get the title of the current location.

### router.getParams()

```
> getPath()
'/login'
```

Grab the current parameters object.

### router.getParam(paramName)

Grab one search query string parameter.

### router.setParams(params)

Set a new params object, replacing the query string.

### router.hasParam(paramName)

Checks for the presence of an item in the query string.

Useful for checking flags in the query like `.hasParam('reverse') == true` when the query string is `?page=2&reverse`

### router.setParam(paramName [, value])

Set a single parameter in the query string without wiping out the rest of the query.

When the value is missing or `null`, the param will be present but have no value, like the `reverse` param in the example above.

### router.removeParam(paramName)

Removes a parameter from the search query string. Mostly the inverse of `setParam`.

### router.toggleParam(paramName [, value])

Toggles the presence of a param in the query string. If setting the param, use the provided value.
