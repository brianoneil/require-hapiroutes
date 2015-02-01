module.exports = function(mod) {
  var debug = require('debug')('require-hapiroutes:routediscovery')
  var requireDirectory = require('require-directory');
  var dirModules = requireDirectory(mod);

  dirModules.routes = [];

  var keys = Object.keys( dirModules );
  for( var i = 0,length = keys.length; i < length; i++ ) {
    var routeModule = dirModules[ keys[ i ] ];

    //if there is a routes property definded on the module use that, otherwise assume the module is the route
    if(routeModule.routes) {
      debug('loading routes from routes property file: %s with %s routes', keys[i], routeModule.routes.length);
      dirModules.routes = dirModules.routes.concat(routeModule.routes);
    }
    else if(routeModule.handler && routeModule.path){
      debug('loading module as a route file: %s', keys[i]);
      dirModules.routes.push(routeModule);
    }
  }

  return dirModules;
}
