var assert = require("assert");

describe('Load Routes', function(){

  var myRoutes = require('./testRoutes');

  describe('has routes', function(){
    it('should have a routes property on the module', function(){

      var propName = 'routes';

      assert.equal(true, myRoutes.hasOwnProperty(propName));

    });
    it('should have 5 loaded route in the array', function(){
      assert.equal(5, myRoutes.routes.length)
    });
  });
  describe('standard module load', function() {
      it('should be a module that is a function', function() {
        assert.equal('hello world', myRoutes.nonRouteModule());
      }); 
  });
})
