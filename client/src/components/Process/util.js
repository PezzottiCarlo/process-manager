class Util {
    static milliToTime(milli) {
        let diff = new Date().getTime() - milli;
        if (diff < 60000) {
            return Math.floor(diff / 1000) + "s";
        }
        if (diff < 3600000) {
            return Math.floor(diff / 60000) + "m";
        }
        if (diff < 86400000) {
            return Math.floor(diff / 3600000) + "h";
        }
        return Math.floor(diff / 86400000) + "d";
    }

    static async restart(pm_id,options = {}) {
        let res = await fetch(`restart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({pm_id,options}),
        })
        return await res.json();
    }

    static async stop(pm_id) {
        let res = await fetch(`stop`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pm_id }),
        })
        return await res.json();
    }

    static async monit(pm_name, length) {
        let res = await fetch(`monit/${pm_name}/${length}`)
        return await res.json();
    }
}
export default Util;