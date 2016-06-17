var express = require('express');
var bodyParser = require('body-parser');
var products = require('./products');
var maxId = require('./max-id');

var app = express();

app.use(bodyParser.json());
app.use('/products', require('./router/get-all-products.js'));
app.use('/products', require('./router/get-one-product.js'));
app.use('/products', require('./router/insert-product.js'));
app.use('/products', require('./router/delete-product.js'));
app.use('/products', require('./router/update-product.js'));

app.listen(3000, function () {
    console.log('server start...');
});