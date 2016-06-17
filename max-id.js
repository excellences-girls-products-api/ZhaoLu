var fs = require('fs');
var maxIdFile = './max-id.json';

fs.stat(maxIdFile, function (err, stat) {
    if (stat && stat.isFile()) {
        return;
    }
    
    initMaxIdFile();
});

function initMaxIdFile() {
    fs.open(maxIdFile, 'a+', function (err, fd) {
        fs.write(fd, "0", 0, 'utf-8', function (err) {
            if (err) {
                console.error(err.stack);
            }
        });
    });
}