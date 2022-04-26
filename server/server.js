const PM2 = require('./util/pm2');
let pm2 = new PM2();

async function init() {
    let list = await pm2.extractInfo(await pm2.getList());
}
init()