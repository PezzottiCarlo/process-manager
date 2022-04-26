const { exec } = require("child_process");

class PM2 {
    constructor() { }
    async getList() {
        //return require("./pm2-example.json");
        let list = await new Promise((resolve, reject) => {
            exec('pm2 jlist', (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                }
                resolve(stdout);
            });
        })
        try {
            return JSON.parse(list);
        } catch (e) {
            return [];
        }
    }
    async extractInfo(list) {
        let result = [];
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let {pid,name,pm_id} = item;
            let {node_version,restart_time,pm_uptime,PWD} = item.pm2_env;
            result.push({
                pid,
                name,
                pm_id,
                node_version,
                restart_time,
                pm_uptime,
                PWD,
                recommendedName:this.recommendedName(PWD,"webserver")
            })
        }
        return result;
    }
    recommendedName(pwd,rootFolder) {
        let name = pwd.split(rootFolder+"/")[1];
        if(name.indexOf("/")>-1){
            name = name.split("/")[0];
        }
        return name;
    }
}

module.exports = PM2;