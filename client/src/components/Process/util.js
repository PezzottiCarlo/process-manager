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
}
export default Util;