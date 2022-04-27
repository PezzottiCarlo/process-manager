import "./Process.css";
import Util from "./util.js";
import { useState } from "react";
import { FiMonitor, FiPower, FiRotateCcw, FiEye, FiEyeOff } from "react-icons/fi";


const Process = ({ process }) => {

    const [status, setStatus] = useState(process.status);
    const [showLog, setShowLog] = useState(false);
    const [logs, setLogs] = useState([]);

    const restart = async (pm_id) => {
        setStatus("changing");
        let status = await Util.restart(pm_id);
        if (status) {
            setStatus(status);
        }
    }

    const stop = async (pm_id) => {
        setStatus("changing");
        let status = await Util.stop(pm_id);
        if (status) {
            setStatus(status);
        }
    }

    const monit = async (pm_name, length) => {
        if(showLog)
            return setShowLog(false);
        let monit = await Util.monit(pm_name, length);
        if (monit) {
            console.log(monit);
            setShowLog(true);
            setLogs(monit.filter(line => line.length > 0));
        }

    }

    return (
        <div className="process-cnt">
            <div className="process">
                <div className={`process-name big ${status}`}>{process.name}</div>
                <div className="process-uptime small">{Util.milliToTime(process.pm_uptime)}</div>
                <div className="process-uptime small"><FiRotateCcw />{process.restart_time}</div>
                <div className="process-watch small">{process.watch ? (<FiEye />) : (<FiEyeOff />)}</div>
                <div className="process-monit collapsible icon small monit" onClick={() => { monit(process.name, 5) }}><FiMonitor /></div>
                <div className="process-restart  collapsible icon small restart" onClick={() => { restart(process.pm_id) }}><FiRotateCcw /></div>
                <div className="process-stop  collapsible icon small stop" onClick={() => { stop(process.pm_id) }}><FiPower /></div>
            </div>
            {(showLog) ? (
            <div className="process-logs">
                {
                    logs.map((log, index) => {
                        return <p className="code">{log}</p>
                    })
                }
            </div>) : (null)}
        </div>
    );
}

export default Process;