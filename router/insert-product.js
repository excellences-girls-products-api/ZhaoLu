var express = require('express');
var router = express.Router();
var fs = require("fs");
var productsFile = './products.json';
var maxIdFile = './max-id.json';

router.post('/', function (req, res) {
    fs.readFile(productsFile, 'utf-8', function (err, data) {
        if (err) {
            console.error(err.stack);
            res.status(500);
            return;
        }

        var data = JSON.parse(data);
        var product = req.body;

        if (isExistProperties(product) && isCorrectType(product)) {
            insertProduct(data, product, res);
        } else {
            res.sendStatus(400);
        }
    });
});

function isExistProperties(product) {
    return product.hasOwnProperty("barcode") && product.hasOwnProperty("name") &&
        product.hasOwnProperty("unit") && product.hasOwnProperty("price");
}

function isCorrectType(product) {
    return typeof(product.barcode) === 'string' && typeof(product.name) === "string" &&
        typeof(product.unit) === "string" && typeof(product.price) === "number";
}

function insertProduct(products, product, res) {
    fs.readFile(maxIdFile, 'utf-8', function (err, maxId) {
        if (err) {
            console.error(err.stack);
            res.status(500);
            return;
        }

        maxId = parseInt(maxId);
        maxId++;
        writeMaxIdFile(maxId, res);

        var item = {
            "id": maxId, "barcode": product.barcode, "name": product.name,
            "unit": product.unit, "price": product.price
        };
        products.push(item);
        writeProductsFile(products, res);

        res.status(201).json(item);
    });
}

function writeMaxIdFile(maxId, res) {
    fs.writeFile(maxIdFile, maxId, function (err) {
        if (err) {
            res.sendStatus(404);
            return;
        }

        return;
    });
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