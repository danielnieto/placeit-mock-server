const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

mockFilesPath = path.join(__dirname, '/mock-files');

router.get('/:type/:id/ui.json', function (req, res) {

    const type = req.params.type;
    const fileName = `${type}-ui-${req.params.id}.json`;

    fs.readFile(path.resolve(mockFilesPath, fileName), 'UTF-8', (err, data) => {
        if (err) return res.sendStatus(404);
        const uijson = JSON.parse(data);
        res.json(uijson);
    });

});

module.exports = router;