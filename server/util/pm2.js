const { exec } = require("child_process");
const pm2 = require("pm2");

class PM2 {
    constructor() {
        if(!this.init()) {
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
        let list = await new Promise((resolve, reject) => {
            pm2.list((err, list) => {
                if (err) {
                    reject(err);
                }
                resolve(list);
            });
        })
        if(list.length > 0) {
            return list;
        }
        return [];
    }
    async extractInfo(list) {
        let result = [];
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let { pid, name, pm_id } = item;
            let { node_version, restart_time, pm_uptime, pm_cwd } = item.pm2_env;
            result.push({
                pid,
                name,
                pm_id,
                node_version,
                restart_time,
                pm_uptime,
                pm_cwd,
                recommendedName: this.recommendedName(pm_cwd, "Projects")
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
    stop(pm_id) {
        let { err, stdout, stderr } = exec('pm2 stop ' + pm_id);
        if (err) {
            return err;
        }
        return true;
    }

    start(pm_id) {
        let { err, stdout, stderr } = exec('pm2 start ' + pm_id);
        if (err) {
            return err;
        }
        return true;
    }

    restart(pm_id) {
        let { err, stdout, stderr } = exec('pm2 restart ' + pm_id);
        if (err) {
            return err;
        }
        return true;
    }

    delete(pm_id) {
        let { err, stdout, stderr } = exec('pm2 delete ' + pm_id);
        if (err) {
            return err;
        }
        return true;
    }

    monit(pm_id) {

    }
}

module.exports = PM2;