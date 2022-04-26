const express = require('express');
const PM2 = require('./util/pm2');
const pm2 = new PM2();
const config = require('./config/config.json');

const app = express();
app.use(express.json());

app.get('/list', async (req, res) => {
    let list = await pm2.extractInfo(await pm2.getList())
    res.send(list);
})

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})