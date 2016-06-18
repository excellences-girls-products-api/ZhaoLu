var express = require('express');
var router = express.Router();
var fs = require('fs');
var productsFile = './products.json';

router.get('/:id', function (req, res, next) {
    fs.readFile(productsFile, 'utf-8', function (err, data) {
        if (err) return next(err);

        data = JSON.parse(data);
        var existProduct = getExistProduct(data, req);
        if (existProduct) {
            res.status(200).json(existProduct);
        } else {
            res.sendStatus(404);
        }
    });
});

function getExistProduct(data, req) {
    for (var i = 0; i < data.length; i++) {
        if ((data[i].id) === parseInt(req.params.id)) {
            return data[i];
        }
    }
}

module.exports = router;