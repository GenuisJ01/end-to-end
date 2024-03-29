require('dotenv').config({path: __dirname + '/.env'});
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});