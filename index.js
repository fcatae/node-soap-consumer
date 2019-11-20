var express = require('express')
var app = express();
var soap = require('soap');

var url = 'http://localhost:8081/service/BasicHttpBinding_IOrderService?wsdl';

app.get('/start', (req, res) => {
    var args = {};
    soap.createClient(url, function(err, client) {
        client.GetOrders(args, function(err, result) {
            var orders = 
                        result.GetOrdersResult.Order.map( order => {
                            return order.Id;
                        })

            res.send({
                mensagem: "boa noite!",
                usuario: "Fabricio",
                pedidos: orders
            })
        });
    });

});

app.listen(8080)