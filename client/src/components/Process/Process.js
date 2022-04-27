import "./Process.css";
import Util from "./util.js";
import { FiMonitor, FiPower, FiRotateCcw, FiEye, FiEyeOff } from "react-icons/fi";


const Process = ({process}) => {

    return (
        <div className="process">
            <div className={`process-name big ${(process.status === "online") ? "active" : "inactive"}`}>{process.name}</div>
            <div className="process-uptime small">{Util.milliToTime(process.pm_uptime)}</div>
            <div className="process-uptime small"><FiRotateCcw />{process.restart_time}</div>
            <div className="process-watch small">{process.watch ? (<FiEye />) : (<FiEyeOff />)}</div>
            <div className="process-monit collapsible icon small monit"><FiMonitor /></div>
            <div className="process-restart  collapsible icon small restart"><FiRotateCcw /></div>
            <div className="process-stop  collapsible icon small stop"><FiPower /></div>
        </div>
    );
}

export default Process;