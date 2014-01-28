var queryString = require('query-string');
var History = require('html5-history');
var _ = require('underscore');
var window = require('globals/window');

var state = {};

var router = exports;

router.route = function route(path, data, title) {
  state.path = path || state.path || router.getPath();
  state.data = data || state.data || {};
  state.title = title || state.title || '';
  var search = '';
  if (!_.isEmpty(state.data)) {
    search = '?' + queryString.stringify(state.data)
  }
  History.pushState(state.data, state.title, state.path + search);
}


var currentHandlers = [];

History.Adapter.bind(window, 'statechange', function() {
  state.path = router.getPath();
  state.params = router.getParams();
  state.title = router.getTitle();
  _.each(currentHandlers, function(handler) {
    handler(state.path, state.params, state.title);
  });
});

router.onRoute = function(handler) {
  currentHandlers = _.union(currentHandlers, handler);
}

router.offRoute = function(handler) {
  currentHandlers = _.without(currentHandlers, handler);
}

router.getPath = function getPath() {
  var path = window.location.pathname;
  return path;
}

router.setPath = function setPath(path) {
  router.route(path, state.params, state.title);
}

router.getTitle = function getTitle() {
  var title = window.document.title;
  return title;
}

router.setTitle = function setTitle(title) {
  window.document.title = state.title = title;
}

router.getParams = function getParams() {
  var params = queryString.parse(window.location.search);
  return params;
}

router.getParam = function getParam(paramName) {
  var params = router.getParams();
  var param = params[paramName];
  return param;
}

router.setParams = function setParams(params) {
  router.route(state.path, params, state.title);
}

router.hasParam = function hasParam(paramName) {
  var params = router.getParams();
  var param = router.getParam(paramName);
  if (_.isUndefined(param)) return false;
  else return true;
}

router.setParam = function setParam(paramName, value) {
  if (_.isUndefined(value)) value = null;
  var params = router.getParams();
  params[paramName] = value;
  router.setParams(params);
}

router.removeParam = function removeParam(paramName) {
  var params = router.getParams();
  delete params[paramName];
  router.setParams(params);
}

router.toggleParam = function toggleParam(paramName, value) {
  if (router.hasParam(paramName)) {
    router.removeParam(paramName);
  } else {
    router.setParam(paramName, value);
  }
}

router.back = function back() {
  return History.back();
}

router.forward = function forward() {
  return History.forward();
}