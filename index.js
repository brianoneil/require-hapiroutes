module.exports = function(mod) {
  var debug = require('debug')('require-hapiroutes:routediscovery')
  var requireDirectory = require('require-directory');
  var dirModules = requireDirectory(mod);

  var routes = [];

  var keys = Object.keys( dirModules );
  for( var i = 0,length = keys.length; i < length; i++ ) {
    var routeModule = dirModules[ keys[ i ] ];

    //if there is a routes property definded on the module use that, otherwise assume the module is the route
    if(routeModule.routes) {
      debug('loading routes from routes property file: %s with %s routes', keys[i], routeModule.routes.length);
      Array.prototype.push.apply(routes, routeModule.routes);
    }

    debug('isArray: %s', Object.prototype.toString.call(routeModule) === '[object Array]')

    if(Array.isArray(routeModule) && routeModule.length > 0 && routeModule[0].hasOwnProperty('handler') && routeModule[0].hasOwnProperty('path')) {
      debug('this looks like an array for some reason')
      Array.prototype.push.apply(routes, routeModule);
    }

    else if( (routeModule.hasOwnProperty('handler') || (routeModule.hasOwnProperty('config') && routeModule.config.hasOwnProperty('handler')) ) && routeModule.hasOwnProperty('path') && (routeModule.handler || routeModule.config.handler) && routeModule.path){
      debug('loading module as a route file: %s', keys[i]);
      routes.push(routeModule);
    }
  }

  dirModules.routes = routes;

  return dirModules;
}
