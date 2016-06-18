var express = require('express');
var router = express.Router();
var fs = require("fs");
var productsFile = './products.json';

router.delete('/:id', function (req, res, next) {
    fs.readFile(productsFile, 'utf-8', function (err, data) {
        if (err) return next(err);

        data = JSON.parse(data);
        if (deleteProduct(data, req, res)) {
            fs.writeFile(productsFile, JSON.stringify(data));
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    });
});

function deleteProduct(data, req) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(req.params.id)) {
            data.splice(i, 1);

            return true;
        }
    }

    return false;
}

module.exports = router;