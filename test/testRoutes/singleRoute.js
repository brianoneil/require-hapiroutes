module.exports =
  {
    method : 'GET',
    path : '/route1',
    handler : function(req, reply) {},
    config : {
      description: 'my route description',
      notes: 'Important stuff to know about this route',
      tags : ['app']
    }
  };
