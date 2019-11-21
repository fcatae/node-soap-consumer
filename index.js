var express = require('express')
var app = express();
var soap = require('soap');

var url = 'http://localhost:5000/pedidos?wsdl';

app.get('/start', (req, res) => {
    var args = {};
    soap.createClient(url, function(err, client) {
        client.ListarPedidos(args, function(err, result) {

            var orders = [];

            result.ListarPedidosResult.Pedido.forEach( pedido => {
                var p = {
                    id: pedido.Id,
                    nome: pedido.Username
                }

                if( p.nome == 'Fabricio' ) {
                    orders.push(p.id);
                }
            })

            console.log(orders)

            res.send({
                mensagem: "boa noite!",
                usuario: "Fabricio",
                pedidos: orders
            })
        });
    });

});

console.log("server is listening on 8080");
app.listen(8080)