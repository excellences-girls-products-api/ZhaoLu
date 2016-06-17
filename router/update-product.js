var express = require('express');
var router = express.Router();
var fs = require('fs');
var productsFile = './products.json';

router.put('/:id', function (req, res) {
    fs.readFile(productsFile, 'utf-8', function (err, products) {
        if (err) {
            console.error(err.stack);
            res.status(500);
            return;
        }

        products = JSON.parse(products);
        var product = req.body;

        if (isExistProperties(product) && isCorrectType(product)) {
            updateProduct(products, product, req, res);
        } else {
            res.sendStatus(400);
        }
    });
});

function updateProduct(products, product, req, res) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(req.params.id)) {

            products[i].barcode = product.barcode;
            products[i].name = product.name;
            products[i].unit = product.unit;
            products[i].price = product.price;

            writeProductsFile(products, res);
            res.status(200).json(products[i]);
            return;
        }
    }

    res.sendStatus(404);
}


function isExistProperties(product) {
    return product.hasOwnProperty("barcode") && product.hasOwnProperty("name") &&
        product.hasOwnProperty("unit") && product.hasOwnProperty("price");
}

function isCorrectType(product) {
    return typeof(product.barcode) === 'string' && typeof(product.name) === "string" &&
        typeof(product.unit) === "string" && typeof(product.price) === "number";
}

function writeProductsFile(products, res) {
    fs.writeFile(productsFile, JSON.stringify(products), function (err) {
        if (err) {
            res.sendStatus(404);
            return;
        }

        return;
    });
}

module.exports = router;