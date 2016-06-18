var express = require('express');
var router = express.Router();
var fs = require("fs");
var productsFile = './products.json';
var maxIdFile = './max-id.json';

router.post('/', function (req, res, next) {
    fs.readFile(productsFile, 'utf-8', function (err, data) {
        if (err) return next(err);

        var data = JSON.parse(data);
        var product = req.body;

        if (isExistProperties(product) && isCorrectType(product)) {
            insertProduct(data, product, res);
        } else {
            res.sendStatus(400);
        }
    });
});

function insertProduct(products, product, res) {
    fs.readFile(maxIdFile, 'utf-8', function (err, maxId) {
        if (err) return next(err);

        maxId = parseInt(maxId);
        maxId++;
        fs.writeFile(maxIdFile, maxId);

        var item = {
            "id": maxId, "barcode": product.barcode, "name": product.name,
            "unit": product.unit, "price": product.price
        };
        products.push(item);
        fs.writeFile(productsFile, JSON.stringify(products));

        res.status(201).json(item);
    });
}

function isExistProperties(product) {
    return product.hasOwnProperty("barcode") && product.hasOwnProperty("name") &&
        product.hasOwnProperty("unit") && product.hasOwnProperty("price");
}

function isCorrectType(product) {
    return typeof(product.barcode) === 'string' && typeof(product.name) === "string" &&
        typeof(product.unit) === "string" && typeof(product.price) === "number";
}

module.exports = router;