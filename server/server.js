const express = require('express');
const PM2 = require('./util/pm2');
const pm2 = new PM2();
const config = require('./config/config.json');

const app = express();

app.use(express.json());
app.use(express.static('../build'));

app.get('/list', async (req, res) => {
    let list = await pm2.extractInfo(await pm2.getList())
    res.send(list);
})

app.get('/monit/:pm_name/:length', async (req, res) => {
    let { pm_name,length} = req.params;
    let monit = await pm2.monit(pm_name,length);
    if(monit)
        return res.json(monit);
    res.send(false);
})

app.post('/restart', async (req, res) => {
    let { pm_id, options } = req.body;
    if((await pm2.restart(pm_id,options))){
        return res.json((await pm2.getInfo(pm_id)).pm2_env.status);
    }
    return res.send(false);
})

app.post('/stop', async (req, res) => {
    let { pm_id } = req.body;
    if((await pm2.stop(pm_id))){
        return res.json((await pm2.getInfo(pm_id)).pm2_env.status);
    }
    return res.send(false);
})


app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})