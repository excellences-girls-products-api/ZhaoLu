var express = require('express');
var router = express.Router();
var fs = require("fs");
var productsFile = './products.json';

router.delete('/:id', function (req, res) {
    fs.readFile(productsFile, 'utf-8', function (err, data) {
        if (err) {
            console.error(err.stack);
            res.status(500);
            return;
        }

        data = JSON.parse(data);
        deleteProduct(data, req, res);
    });
});

function deleteProduct(data, req, res) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(req.params.id)) {
            data.splice(i, 1);
            writeProductsFile(data, res);

            res.sendStatus(204);
            return;
        }
    }

    res.sendStatus(404);
}

function writeProductsFile(data, res) {
    fs.writeFile(productsFile, JSON.stringify(data), function (err) {
        if (err) {
            res.sendStatus(404);
            return;
        }
        
        return;
    });
}

module.exports = router;