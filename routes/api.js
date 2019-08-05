var todo = require('../models/todo');
  
module.exports = {
  configure: function(app) {
    app.get('/todo/', function(req, res) {
      	todo.get(res);
    });

    app.get('/todo/read/:id_shop/:id_cus', function(req, res) {
      	todo.read(req.params.id_shop, req.params.id_cus, res);
    });

    app.post('/todo/create', function(req, res) {
  //   	var data1 = {
		// 	id_prod : '1830628360263',
		// 	id_shop : 'cowell-gec.myshopify.com',
		// 	id_customer : '12062001'
		// };
		// res.send(JSON.parse(req));
		// console.log(req.body);
      	todo.create(req.body, res);
    });

    app.get('/todo/delete/:id_prod/:id_cus', function(req, res) {
      	todo.delete(req.params.id_prod, req.params.id_cus, res);
    });
  }
};