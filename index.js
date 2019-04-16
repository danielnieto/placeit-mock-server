const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const port = process.env.PORT || 45537;
const app = express();

app.use(cors());

app.use('/', routes);

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});