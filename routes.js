const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

mockFilesPath = path.join(__dirname, '/mock-files');

router.get('/:category/:id/:file', function (req, res) {

    const category = req.params.category;
    const fileParam = req.params.file;
    const [fileName, fileExt] = fileParam.split('.');
    const filePath = `${category}-${fileName}-${req.params.id}.${fileExt}`;
    const failRate = req.query.fail && parseFloat(req.query.fail) || 0;

    if (Math.random() < failRate) {
        return res.sendStatus(500);
    }

    fs.readFile(path.resolve(mockFilesPath, filePath), 'UTF-8', (err, data) => {
        if (err) return res.sendStatus(404);

        if (fileExt.toLowerCase() === 'json') {
            console.log('is a json');

            return res.json(JSON.parse(data));
        }

        return res.end(data);
    });

});

module.exports = router;