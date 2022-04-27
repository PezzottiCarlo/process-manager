const { exec } = require("child_process");
const fs = require("fs");
const pm2 = require("pm2");

class PM2 {
    constructor() {
        if (!this.init()) {
            throw new Error("PM2 not connected");
        }
    }

    async init() {
        let connect = await new Promise((resolve, reject) => {
            pm2.connect((err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        })
        return connect;
    }

    async getList() {
        //return require("./pm2-example-big.json");
        let list = await new Promise((resolve, reject) => {
            pm2.list((err, list) => {
                if (err) {
                    reject(err);
                }
                resolve(list);
            });
        })
        if (list.length > 0) {
            return list;
        }
        return [];
    }
    async extractInfo(list) {
        let result = [];
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let { pid, name, pm_id } = item;
            let { node_version, restart_time, pm_uptime, pm_cwd,watch,status} = item.pm2_env;
            result.push({
                pid,
                name,
                pm_id,
                node_version,
                restart_time,
                pm_uptime,
                pm_cwd,
                recommendedName: this.recommendedName(pm_cwd, "webserver"),
                watch,
                status
            })
        }
        return result;
    }
    recommendedName(pwd, rootFolder) {
        let name = pwd.split(rootFolder + "/")[1];
        if (name) {
            if (name.indexOf("/") > -1) {
                name = name.split("/")[0];
            }
            return name;
        }
        return "";
    }

    //refact using programmatic api
    async stop(pm_id) {
        return await new Promise((resolve, reject) => {
            pm2.stop(pm_id, (err, proc) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            })
        })
    }

    async start(path) {
        return await new Promise((resolve, reject) => {
            pm2.start(path, (err, proc) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            })
        })
    }

    async restart(pm_id) {
        return await new Promise((resolve, reject) => {
            pm2.restart(pm_id, (err, proc) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            })
        })
    }

    async delete(pm_id) {
        return await new Promise((resolve, reject) => {
            pm2.delete(pm_id, (err, proc) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            })
        })
    }

    //to be refactored when pm2 api when will be better documented
    async monit(pm_name, length) {
        let result = await new Promise((resolve, reject) => {
            pm2.reloadLogs((err)=>{
                if (err) {
                    reject(err);
                }
                resolve(true);
            })
        })
        if (result) {
            let path = `${process.env.HOME}/.pm2/logs/${pm_name}-out.log`;
            let lines = fs.readFileSync(path, 'utf8').split('\n');
            return lines.slice(-length);
        }else{
            return [];
        }
    }
}

module.exports = PM2;