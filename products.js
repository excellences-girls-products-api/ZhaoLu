var fs = require('fs');
var productsFile = './products.json';

fs.stat(productsFile, function (err, stat) {
    if (stat && stat.isFile()) {
        return;
    }
    
    initProductsFile();
});

function initProductsFile() {
    fs.open(productsFile, 'a+', function (err, fd) {
        fs.write(fd, "[]", 0, 'utf-8', function (err) {
            if (err) {
                console.error(err.stack);
            }
        });
    });
}
